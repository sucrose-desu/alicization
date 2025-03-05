'use server'

// import 'server-only'
import { headers } from 'next/headers'

import { verifyToken } from '@/libs/jwt'
import { findAccountOBAC, getRoleAndPermissions } from '@/services/auth'

import { permissionValidator } from './permission'

/**
 * JWT authorization protected.
 * @returns AccountOBAC
 */
export async function useProtector() {
  const headerStore = await headers()
  const bearerToken = headerStore.get('Authorization')
  if (bearerToken) {
    const token = bearerToken.replace(/^(B|b)earer/g, '').trim()
    const auth = await verifyToken(token)
    if (auth) {
      const account = await findAccountOBAC(auth)
      if (account) {
        return account
      }
    }
  }

  throw new Error('Unauthorized')
}

/**
 * Determines access permissions based on the role and resource.
 * @param resource e.g. `"account"`
 */
export async function canAccess(resource: string): Promise<CanAccess> {
  const role = await getRoleAndPermissions()
  return permissionValidator(role, resource)
}
