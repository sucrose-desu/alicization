import { jwtVerify, SignJWT } from 'jose'

import { ENV, JWT } from '@/constants/env'
import type { AccountOBAC } from '@/drizzle/types'

/**
 * Signs a JWT token
 * @param account AccountOBAC
 */
export async function signToken(account: AccountOBAC) {
  const key = new TextEncoder().encode(JWT.JWT_SECRET)
  const payload: JwtPayload = {
    id: account.id,
    uid: account.uid,
    role: account.role.id,
    team: account.team.id
  }

  return new SignJWT(payload)
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
  const key = new TextEncoder().encode(JWT.JWT_SECRET)
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
