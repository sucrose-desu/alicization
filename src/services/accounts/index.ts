'use server'

import { schema, withPagination } from '@alicization-hub/db-schema'
import { hashSync } from 'bcryptjs'
import { and, count, desc, eq, getTableColumns, ne, SQL } from 'drizzle-orm'
import { omit } from 'ramda'

import { db } from '@/drizzle'
import { generateUid, isNotEqual } from '@/libs/utils'

import type { CreateSchema, QuerySchema, UpdateSchema } from './validator.zod'

export async function findAccounts(query: QuerySchema): Promise<[number, any[]]> {
  const accountColumns = getTableColumns(schema.accounts)
  const profileColumns = getTableColumns(schema.profiles)
  const roleColumns = getTableColumns(schema.roles)
  const filters: SQL[] = [ne(schema.roles.tier, 'root')]

  if (isNotEqual('all', query?.tier)) {
    filters.push(eq(schema.roles.tier, query.tier as Role.Tiers))
  }

  if (isNotEqual('all', query?.status)) {
    switch (query.status) {
      case 'active':
      case 'inactive':
        filters.push(eq(schema.accounts.isActive, query.status === 'active'))
        break

      case 'verified':
      case 'unverified':
        filters.push(eq(schema.accounts.isVerified, query.status === 'verified'))
        break

      case 'suspended':
        filters.push(eq(schema.accounts.isSuspended, true))
        break
    }
  }

  return db.transaction(async (tx) => {
    const queryBuilder = tx
      .select({
        ...omit(['password'], accountColumns),
        profile: omit(['accountId'], profileColumns),
        role: roleColumns
      })
      .from(schema.accounts)
      .leftJoin(schema.profiles, eq(schema.accounts.id, schema.profiles.accountId))
      .leftJoin(schema.accountWithRole, eq(schema.accounts.id, schema.accountWithRole.accountId))
      .leftJoin(schema.roles, eq(schema.accountWithRole.roleId, schema.roles.id))
      .where(and(...filters))
      .orderBy(desc(schema.accounts.createdAt))
      .$dynamic()

    const queryCountBuilder = tx
      .select({ count: count() })
      .from(schema.accounts)
      .leftJoin(schema.profiles, eq(schema.accounts.id, schema.profiles.accountId))
      .leftJoin(schema.accountWithRole, eq(schema.accounts.id, schema.accountWithRole.accountId))
      .leftJoin(schema.roles, eq(schema.accountWithRole.roleId, schema.roles.id))
      .where(and(...filters))
      .$dynamic()

    const accounts = await withPagination(queryBuilder, query.page, query.take).execute()
    const [r] = await queryCountBuilder.execute()

    return [+r.count, accounts]
  })
}

export async function findAccount(id: number) {
  const result = await db.query.accountWithRole.findFirst({
    where: eq(schema.accounts.id, id),
    with: {
      account: {
        columns: { password: false },
        with: {
          profile: {
            columns: { accountId: false }
          }
        }
      },
      role: {
        with: {
          permissions: {
            columns: { roleId: false }
          }
        }
      }
    }
  })

  if (!result) return null

  return {
    ...result?.account,
    role: result?.role
  }
}

export async function createAccount(values: CreateSchema) {
  const { roleId, profile, ...accountValues } = values

  return db.transaction(async (tx) => {
    const [{ accountId }] = await tx
      .insert(schema.accounts)
      .values({
        ...accountValues,
        uid: generateUid(),
        password: hashSync(accountValues.password)
      })
      .returning({ accountId: schema.accounts.id })

    await tx.insert(schema.profiles).values({ accountId, ...profile })
    await tx.insert(schema.accountWithRole).values({ accountId, roleId })
  })
}

export async function updateAccount(id: number, values: UpdateSchema) {
  const { profile, ...accountValues } = values

  return db.transaction(async (tx) => {
    await tx.update(schema.accounts).set(accountValues).where(eq(schema.accounts.id, id))

    if (profile) {
      await tx.update(schema.profiles).set(profile).where(eq(schema.profiles.accountId, id))
    }
  })
}
