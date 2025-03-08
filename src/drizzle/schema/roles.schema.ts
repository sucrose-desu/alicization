import { relations } from 'drizzle-orm'
import { boolean, index, integer, json, pgTable, serial, text, uniqueIndex } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns } from '../utils'
import { accountWithRole } from './accounts.schema'

export const roles = pgTable(
  'roles',
  {
    id: serial('id').primaryKey(),
    tier: text('tier').notNull().$type<Role.Tiers>().default('user'),
    name: text('name').unique().notNull().default('user'),
    description: text('description'),
    isActive: boolean('is_active').notNull().default(true),
    ...sharedTimestampConumns
  },
  (self) => [index().on(self.tier), uniqueIndex().on(self.name)]
).enableRLS()

export const permissions = pgTable(
  'permissions',
  {
    id: serial('id').primaryKey(),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    action: text('action').notNull().$type<Permission.Actions>(),
    resource: text('resource').notNull().$type<Permission.Resources>(),
    conditions: json('conditions').$type<Record<string, any>[]>(),
    description: text('description'),
    isActive: boolean('is_active').default(true),
    ...sharedTimestampConumns
  },
  (self) => [index().on(self.action), index().on(self.resource)]
).enableRLS()

// ********************** Relations ********************** \\

export const rolesRelations = relations(roles, ({ many }) => ({
  accounts: many(accountWithRole),
  permissions: many(permissions)
}))

export const permissionsRelations = relations(permissions, ({ one }) => ({
  role: one(roles, {
    fields: [permissions.roleId],
    references: [roles.id]
  })
}))
