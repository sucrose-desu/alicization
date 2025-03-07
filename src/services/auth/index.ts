'use server'

// import 'server-only'
import { compareSync } from 'bcryptjs'
import { addDays, addYears } from 'date-fns'
import { eq, getTableColumns } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { omit } from 'ramda'
import { NIL, v5 as uuidV5 } from 'uuid'

import { APP_AUTH_ACCESS, APP_AUTH_REFRESH } from '@/constants'
import { ENV } from '@/constants/env'
import { db, schema } from '@/drizzle'
import type { AccountRBAC, RoleAndPermission } from '@/drizzle/types'
import { signToken } from '@/libs/jwt'

import type { SignInSchema } from './validator.zod'

export async function signIn(formData: SignInSchema): Promise<TResponse | void> {
  const [account] = await db
    .select()
    .from(schema.accounts)
    .where(eq(schema.accounts.username, formData.username))

  if (!account) {
    return {
      statusCode: 403,
      message: 'Your `username` is incorrect.'
    }
  } else if (account.isSuspended) {
    return {
      statusCode: 403,
      message: 'Your account has been suspended.'
    }
  } else if (!compareSync(formData.password, account.password)) {
    return {
      statusCode: 403,
      message: 'Your `password` is incorrect.'
    }
  } else {
    const result = await findAccountRBAC(account.id)
    const cookieStore = await cookies()

    const accessToken = await signToken(result)
    cookieStore.set(APP_AUTH_ACCESS, accessToken, { secure: true, expires: addYears(new Date(), 1) })

    const refreshKey = uuidV5(`${ENV.APP_NAME}//${result.uid}:${Date.now()}`, NIL)
    cookieStore.set(APP_AUTH_REFRESH, refreshKey, { secure: true, expires: addDays(new Date(), 30) })

    if (['user', 'guest'].includes(result.role.tier)) {
      redirect(`/browse`)
    } else {
      redirect(`/labs/lobby`)
    }
  }
}

export async function signOut(jestCleanUp?: boolean): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.delete(APP_AUTH_ACCESS)
  cookieStore.delete(APP_AUTH_REFRESH)

  if (!jestCleanUp) {
    redirect('/sign-in')
  }
}

export async function findAccountRBAC(accountId: number): Promise<AccountRBAC> {
  const accountColumns = getTableColumns(schema.accounts)
  const roleColumns = getTableColumns(schema.roles)

  const [account] = await db
    .select({
      ...omit(['password'], accountColumns),
      role: roleColumns
    })
    .from(schema.accountWithRole)
    .innerJoin(schema.accounts, eq(schema.accounts.id, schema.accountWithRole.accountId))
    .innerJoin(schema.roles, eq(schema.roles.id, schema.accountWithRole.roleId))
    .where(eq(schema.accounts.id, accountId))

  return account
}

export async function findRoleAndPermissions(accountId: number): Promise<RoleAndPermission> {
  const result = await db.query.accountWithRole.findFirst({
    where: eq(schema.accountWithRole.accountId, accountId),
    with: {
      role: {
        with: {
          permissions: {
            columns: { roleId: false }
          }
        }
      }
    }
  })

  return result!.role
}
