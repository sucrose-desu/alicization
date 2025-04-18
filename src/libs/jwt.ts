import type { AccountRBAC } from '@alicization-hub/db-schema'
import { jwtVerify, SignJWT } from 'jose'

import { ENV, JWT } from '@/constants/env'

const key = new TextEncoder().encode(JWT.JWT_SECRET)

/**
 * The function `signToken` generates a signed JWT token using the provided account information and a key.
 *
 * @param {AccountRBAC} account - The `signToken` function takes an `account` object of type `AccountRBAC` as a parameter. The `account` object is expected to have the following properties:
 *
 * @returns The `signToken` function is returning a signed JSON Web Token (JWT) with the specified payload data including the subject (`sub`), identifier (`id`), and role (`role`) extracted from the `account` object. The JWT is signed using the `HS256` algorithm with a key and includes additional information such as the issuer, issued at time, and expiration time.
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
 * The function `verifyToken` verifies a JWT token using a specified key and algorithm, returning the payload if successful or null if an error occurs.
 *
 * @param {string} token - The `token` parameter is a string that represents the JWT (JSON Web Token) that needs to be verified. It is typically generated by a server and sent to a client for authentication and authorization purposes. The `verifyToken` function takes this token as input and verifies its authenticity using the `jwt
 *
 * @returns The `verifyToken` function returns the payload of the JWT token as a `JwtPayload` object if the token is successfully verified. If there is an error during verification, it logs the error to the console and returns `null`.
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
