'use server'

// import 'server-only'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { APP_AUTH_ACCESS } from '@/constants'
import type { AccountRBAC } from '@/drizzle/types'
import { verifyToken } from '@/libs/jwt'
import { findAccountRBAC, findRoleAndPermissions } from '@/services/auth'

import { permissionValidator } from '../permission'

/**
 *
 * @returns JwtPayload
 */
export async function useAuthValidator() {
  const headerStore = await headers()
  const bearerToken = headerStore.get('Authorization')
  if (bearerToken) {
    const token = bearerToken.replace(/^(B|b)earer/g, '').trim()
    const auth = await verifyToken(token)
    if (auth) {
      return auth
    }
  }

  throw new Error('Unauthorized')
}

/**
 *
 * @returns AccountRBAC
 */
export async function useProtector(route: 'public' | 'labs' = 'public'): Promise<AccountRBAC> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(APP_AUTH_ACCESS)
  if (accessToken) {
    const auth = await verifyToken(accessToken.value)
    if (auth) {
      const account = await findAccountRBAC(auth.id)

      const index = ['root', 'admin', 'assistant', 'operater', 'user', 'guest'].indexOf(account.role.tier)
      if (index < 0) {
        redirect(`/decline?error=${index}`)
      } else if (index < 4 && route === 'public') {
        redirect(`/labs/lobby`)
      } else if (index > 3 && route === 'labs') {
        redirect(`/browse`)
      }

      return account
    }
  }

  redirect(`/decline?error=Unauthorized`)
}

/**
 * Determines access permissions based on the role and resource.
 * @param accountId
 * @param resource e.g. `"account"`
 */
export async function canAccess(accountId: number, resource: Permission.Resources): Promise<CanAccess> {
  const role = await findRoleAndPermissions(accountId)
  return permissionValidator(role, resource)
}
