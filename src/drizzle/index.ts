import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { DATABASE_URL } from '@/constants/env'

import * as accounts from './schema/accounts.schema'
import * as commons from './schema/commons.schema'
import * as roles from './schema/roles.schema'
import * as teams from './schema/teams.schema'
import * as titles from './schema/titles.schema'

export const schema = Object.freeze({
  ...accounts,
  ...commons,
  ...roles,
  ...teams,
  ...titles
})

export const db = drizzle({
  client: postgres(DATABASE_URL, { prepare: false }),
  schema,
  logger: false,
  casing: 'camelCase'
})
