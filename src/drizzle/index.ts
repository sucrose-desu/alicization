import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { DATABASE_URL } from '@/constants/env'

import * as accounts from './schema/accounts.schema'
import * as roles from './schema/roles.schema'
import * as spaces from './schema/spaces.schema'

export const schema = Object.freeze({
  ...accounts,
  ...roles,
  ...spaces
})

export const db = drizzle({
  client: postgres(DATABASE_URL, { prepare: false }),
  schema,
  logger: false,
  casing: 'camelCase'
})
