import { relations } from 'drizzle-orm'
import { boolean, index, integer, json, serial, text, uniqueIndex } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'
import { stateOfTeams, teams } from './teams.schema'

export const roles = useSchema
  .table(
    'roles',
    {
      id: serial('id').primaryKey(),
      teamId: integer('team_id')
        .notNull()
        .references(() => teams.id, { onDelete: 'cascade' }),
      tier: text('tier').notNull().$type<Tiers>().default('user'),
      name: text('name').unique().notNull().default('user'),
      description: text('description'),
      isActive: boolean('is_active').default(true),
      ...sharedTimestampConumns
    },
    (self) => [index().on(self.tier), uniqueIndex().on(self.name)]
  )
  .enableRLS()

export const permissions = useSchema
  .table(
    'permissions',
    {
      id: serial('id').primaryKey(),
      roleId: integer('role_id')
        .notNull()
        .references(() => roles.id, { onDelete: 'cascade' }),
      action: text('action').notNull().$type<PermissionActions>(),
      resource: text('resource').notNull().$type<PermissionResources>(),
      conditions: json('conditions').$type<Record<string, any>[]>(),
      description: text('description'),
      isActive: boolean('is_active').default(true),
      ...sharedTimestampConumns
    },
    (self) => [index().on(self.action), index().on(self.resource)]
  )
  .enableRLS()

// ********************** Relations ********************** \\

export const rolesRelations = relations(roles, ({ one, many }) => ({
  team: one(teams, {
    fields: [roles.teamId],
    references: [teams.id]
  }),
  accounts: many(stateOfTeams),
  permissions: many(permissions)
}))

export const permissionsRelations = relations(permissions, ({ one }) => ({
  role: one(roles, {
    fields: [permissions.roleId],
    references: [roles.id]
  })
}))
