import { relations } from 'drizzle-orm'
import { boolean, serial, text } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'

export const commons = useSchema
  .table(
    'commons',
    {
      id: serial('id').primaryKey(),
      isActive: boolean('is_active').notNull().default(true),
      ...sharedTimestampConumns
    },
    (self) => []
  )
  .enableRLS()

// ********************** Relations ********************** \\

export const commonsRelations = relations(commons, ({ one, many }) => ({}))
