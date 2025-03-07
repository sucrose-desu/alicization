import { relations } from 'drizzle-orm'
import { boolean, integer, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'
import { roles } from './roles.schema'
import { watch } from './spaces.schema'

export const accounts = useSchema
  .table(
    'accounts',
    {
      id: serial('id').primaryKey(),
      uid: text('uid').unique().notNull(),
      username: text('username').unique().notNull(),
      password: text('password').notNull(),
      isActive: boolean('is_active').notNull().default(true),
      isVerified: boolean('is_verified').notNull().default(false),
      isSuspended: boolean('is_suspended').notNull().default(false),
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
    email: text('email').notNull(),
    phoneNo: text('phone_no').notNull(),
    displayNeme: text('display_name').notNull().default('display name'),
    avatar: text('avatar').notNull().default('default-avatar.webp'),
    bio: text('bio'),
    ...sharedTimestampConumns
  })
  .enableRLS()

export const accountWithRole = useSchema
  .table('_account_with_role', {
    id: serial().primaryKey(),
    accountId: integer()
      .notNull()
      .references(() => accounts.id),
    roleId: integer()
      .notNull()
      .references(() => roles.id),
    ...sharedTimestampConumns
  })
  .enableRLS()

// ********************** Relations ********************** \\

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [accounts.id],
    references: [profiles.accountId]
  }),
  watchHistory: many(watch)
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  account: one(accounts, {
    fields: [profiles.accountId],
    references: [accounts.id]
  })
}))

export const accountWithRoleRelations = relations(accountWithRole, ({ one }) => ({
  account: one(accounts, {
    fields: [accountWithRole.accountId],
    references: [accounts.id]
  }),
  role: one(roles, {
    fields: [accountWithRole.roleId],
    references: [roles.id]
  })
}))
