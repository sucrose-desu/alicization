import { relations } from 'drizzle-orm'
import { boolean, integer, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'
import { stateOfTeams } from './teams.schema'
import { watch } from './titles.schema'

export const accounts = useSchema
  .table(
    'accounts',
    {
      id: serial('id').primaryKey(),
      uid: text('uid').unique().notNull(),
      username: text('username').unique().notNull(),
      password: text('password').notNull(),
      isActive: boolean('is_active').default(true),
      isVerified: boolean('is_verified').default(false),
      isSuspended: boolean('is_suspended').default(false),
      suspendedAt: timestamp('suspended_at', { precision: 6, withTimezone: true }),
      ...sharedTimestampConumns
    },
    (self) => [uniqueIndex().on(self.uid), uniqueIndex().on(self.username)]
  )
  .enableRLS()

export const profiles = useSchema
  .table('profiles', {
    id: serial('id').primaryKey(),
    accountId: integer('account_id')
      .notNull()
      .references(() => accounts.id, { onDelete: 'cascade' }),
    email: text('email'),
    phoneNo: text('phone_no'),
    displayNeme: text('display_name').default('display name'),
    avatar: text('avatar').default('default-avatar.webp'),
    bio: text('bio'),
    ...sharedTimestampConumns
  })
  .enableRLS()

// ********************** Relations ********************** \\

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [accounts.id],
    references: [profiles.accountId]
  }),
  teams: many(stateOfTeams),
  roles: many(stateOfTeams),
  watchHistory: many(watch)
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  account: one(accounts, {
    fields: [profiles.accountId],
    references: [accounts.id]
  })
}))
