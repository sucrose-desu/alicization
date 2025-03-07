'use server'

import { cookies } from 'next/headers'

import { APP_AUTH_ACCESS, headers } from '@/constants'

export async function createHeaders(): Promise<Headers> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(APP_AUTH_ACCESS)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken.value}`)
  }

  return headers
}
