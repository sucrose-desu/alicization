import { schema } from '@alicization-hub/db-schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { DATABASE_URL } from '@/constants/env'

export const queryClient = postgres(DATABASE_URL, { prepare: false })
export const db = drizzle({
  client: queryClient,
  schema,
  logger: false,
  casing: 'camelCase'
})
