import { relations } from 'drizzle-orm'
import { boolean, pgTable, serial } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns } from '../utils'

export const commons = pgTable(
  'commons',
  {
    id: serial('id').primaryKey(),
    isActive: boolean('is_active').notNull().default(true),
    ...sharedTimestampConumns
  },
  (self) => []
).enableRLS()

// ********************** Relations ********************** \\

export const commonsRelations = relations(commons, ({ one, many }) => ({}))
