'use server'

import { cookies } from 'next/headers'

import { APP_AUTH_ACCESS, CONTENT_LANG, CONTENT_TYPE } from '@/constants'
import { Locales } from '@/constants/enum'
import { ENV } from '@/constants/env'

export const headers = new Headers({
  'Access-Control-Allow-Origin': ENV.APP_BASE_URL,
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
  'Access-Control-Allow-Headers': `Authorization, ${CONTENT_TYPE}, ${CONTENT_LANG}`,
  [CONTENT_TYPE]: 'application/json',
  [CONTENT_LANG]: Locales.US
})

export async function createHeaders(): Promise<Headers> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(APP_AUTH_ACCESS)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken.value}`)
  }

  return headers
}
