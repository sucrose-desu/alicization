import { relations } from 'drizzle-orm'
import { boolean, integer, serial, text, uniqueIndex } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'
import { accounts } from './accounts.schema'
import { roles } from './roles.schema'

export const teams = useSchema
  .table(
    'teams',
    {
      id: serial('id').primaryKey(),
      name: text('name').notNull(),
      email: text('email'),
      bio: text('bio'),
      isActive: boolean('is_active').default(true),
      ...sharedTimestampConumns
    },
    (self) => [uniqueIndex().on(self.name)]
  )
  .enableRLS()

export const stateOfTeams = useSchema
  .table('state_of_teams', {
    id: serial('id').primaryKey(),
    teamId: integer('team_id')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    accountId: integer('account_id')
      .notNull()
      .references(() => accounts.id, { onDelete: 'cascade' }),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    ...sharedTimestampConumns
  })
  .enableRLS()

// ********************** Relations ********************** \\

export const teamsRelations = relations(roles, ({ many }) => ({
  accounts: many(stateOfTeams),
  roles: many(roles)
}))
