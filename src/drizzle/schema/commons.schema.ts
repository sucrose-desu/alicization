import { relations } from 'drizzle-orm'
import { boolean, serial, text } from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'
import { genresOfTitles } from './titles.schema'

export const genres = useSchema
  .table(
    'genres',
    {
      id: serial('id').primaryKey(),
      group: text('group').$type<GenreGroup>().default('general'),
      text: text('text').unique(),
      isActive: boolean('is_active').default(true),
      ...sharedTimestampConumns
    },
    (self) => []
  )
  .enableRLS()

// ********************** Relations ********************** \\

export const genresRelations = relations(genres, ({ one, many }) => ({
  titles: many(genresOfTitles)
}))
