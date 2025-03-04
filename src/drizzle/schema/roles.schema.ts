import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  json,
  serial,
  text,
  timestamp,
  uniqueIndex
} from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'
import { accountWithRole } from './accounts.schema'

export const roles = useSchema
  .table(
    'roles',
    {
      id: serial().primaryKey(),
      tier: text().$type<Tiers>().default('user'),
      name: text().unique().default('user'),
      description: text(),
      isActive: boolean().default(true),
      ...sharedTimestampConumns
    },
    (table) => [
      index('role_tier_index').on(table.tier),
      uniqueIndex('role_name_index').on(table.name)
    ]
  )
  .enableRLS()

export const permissions = useSchema
  .table(
    'permissions',
    {
      id: serial().primaryKey(),
      roleId: integer()
        .notNull()
        .references(() => roles.id),
      action: text().notNull().$type<PermissionActions>(),
      resource: text().notNull().$type<PermissionResources>(),
      conditions: json().$type<Record<string, any>[]>(),
      description: text(),
      isActive: boolean().default(true),
      ...sharedTimestampConumns
    },
    (table) => [
      index('permission_action_index').on(table.action),
      index('permission_resource_index').on(table.resource)
    ]
  )
  .enableRLS()

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
