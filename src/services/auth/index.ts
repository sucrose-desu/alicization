'use server'

import { and, eq, getTableColumns } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { omit } from 'ramda'

import { APP_AUTH_ACCESS, APP_AUTH_REFRESH } from '@/constants'
import { ENV } from '@/constants/env'
import { db, schema } from '@/drizzle'
import type { AccountOBAC, RoleAndPermission } from '@/drizzle/types'

import { createHeaders } from '../helpers'
import type { SignInSchema } from './validator.zod'

export async function signIn(formData: SignInSchema) {
  const headers = await createHeaders()
  const response = await fetch(`${ENV.API_GATEWAY}/auth/sign-in`, {
    method: 'POST',
    headers,
    body: JSON.stringify(formData)
  })

  const data: XHRLogin = await response.json()

  if (response.ok) {
    const cookieStore = await cookies()
    const cookieOptions: any = {
      sameSite: 'strict',
      secure: true
    } // as ResponseCookie

    cookieStore.set(APP_AUTH_ACCESS, data.accessToken, cookieOptions)
    cookieStore.set(APP_AUTH_REFRESH, data.refreshToken, cookieOptions)
  }

  return data as unknown as XHResponse<null>
}

export async function signOut() {
  const cookieStore = await cookies()

  cookieStore.delete(APP_AUTH_ACCESS)
  cookieStore.delete(APP_AUTH_REFRESH)

  redirect('/sign-in')
}

export async function findAccountOBAC(auth: JwtPayload): Promise<AccountOBAC> {
  const accountColumns = getTableColumns(schema.accounts)
  const teamColumns = getTableColumns(schema.teams)
  const roleColumns = getTableColumns(schema.roles)

  const [account] = await db
    .select({
      ...omit(['password'], accountColumns),
      role: omit(['teamId'], roleColumns),
      team: teamColumns
    })
    .from(schema.stateOfTeams)
    .innerJoin(schema.accounts, eq(schema.accounts.id, schema.stateOfTeams.accountId))
    .innerJoin(schema.teams, eq(schema.teams.id, schema.stateOfTeams.teamId))
    .innerJoin(schema.roles, eq(schema.roles.id, schema.stateOfTeams.roleId))
    .where(and(eq(schema.accounts.id, auth.id), eq(schema.teams.id, auth.team)))

  return account
}

export async function getRoleAndPermissions(): Promise<RoleAndPermission> {
  const headers = await createHeaders()
  const response = await fetch(`${ENV.API_GATEWAY}/auth/permissions`, {
    method: 'GET',
    headers,
    priority: 'high'
  })

  return response.json()
}
