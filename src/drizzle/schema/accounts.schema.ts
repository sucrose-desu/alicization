import { boolean, integer, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'
import { roles } from './roles.schema'

export const accounts = useSchema
  .table(
    'accounts',
    {
      id: serial().primaryKey(),
      uid: text().unique().notNull(),
      email: text().unique().notNull(),
      password: text().notNull(),
      isActive: boolean().default(true),
      isVerified: boolean().default(false),
      isSuspended: boolean().default(false),
      suspendedAt: timestamp({ precision: 6, withTimezone: true }),
      ...sharedTimestampConumns
    },
    (self) => [
      uniqueIndex('account_uid_index').on(self.uid),
      uniqueIndex('account_email_index').on(self.email)
    ]
  )
  .enableRLS()

export const profiles = useSchema
  .table(
    'profiles',
    {
      id: serial().primaryKey(),
      ...sharedTimestampConumns
    },
    (self) => []
  )
  .enableRLS()

export const accountWithRole = useSchema.table('_accountWithRole', {
  id: serial().primaryKey(),
  accountId: integer()
    .references(() => accounts.id)
    .notNull(),
  roleId: integer()
    .references(() => roles.id)
    .notNull(),
  ...sharedTimestampConumns
})

// ********************** Relations ********************** \\
