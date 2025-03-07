import { jwtVerify, SignJWT } from 'jose'

import { ENV, JWT } from '@/constants/env'
import type { AccountRBAC } from '@/drizzle/types'

const key = new TextEncoder().encode(JWT.JWT_SECRET)

/**
 * Signs a JWT token
 * @param account AccountRBAC
 */
export async function signToken(account: AccountRBAC) {
  return new SignJWT({
    sub: account.uid,
    id: account.id,
    role: account.role.tier
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(ENV.APP_NAME)
    .setIssuedAt(new Date())
    .setExpirationTime(JWT.JWT_TTL)
    .sign(key)
}

/**
 * Verifies a JWT token
 * @param token AccessToken
 */
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256']
    })
    return payload as JwtPayload
  } catch (error) {
    console.error(error)
    return null
  }
}
