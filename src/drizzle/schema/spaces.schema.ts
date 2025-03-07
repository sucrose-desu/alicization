import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  json,
  real,
  serial,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'

import { sharedTimestampConumns, useSchema } from '../utils'
import { accounts } from './accounts.schema'

export const titles = useSchema
  .table(
    'titles',
    {
      id: uuid('id').defaultRandom().primaryKey(),
      groupId: uuid('group_id').defaultRandom(),
      name: text('name').notNull(),
      subName: text('sub_name'),
      description: text('description'),
      keywords: text('keywords'),
      poster: text('poster').notNull(),
      category: text('category').notNull().$type<Title.Category>().default('anime'),
      dubbed: text('dubbed').notNull().$type<Title.Dubbed>().default('japan'),
      status: text('status').notNull().$type<Title.Status>().default('airing'),
      studio: text('studio'),
      source: text('source').$type<Title.Source>().default('etc'),
      seasonNo: integer('season_no').notNull().default(1),
      link: text('link'),
      isActive: boolean('is_active').default(true),
      releasedAt: timestamp('released_at', { precision: 6, withTimezone: true }),
      ...sharedTimestampConumns
    },
    (self) => [
      index().on(self.name),
      index().on(self.category),
      index().on(self.dubbed),
      index().on(self.status)
    ]
  )
  .enableRLS()

export const tracks = useSchema
  .table(
    'tracks',
    {
      id: uuid('id').defaultRandom().primaryKey(),
      titleId: integer('title_id')
        .references(() => titles.id, { onDelete: 'cascade' })
        .notNull(),
      title: text('title').notNull(),
      description: text('description'),
      poster: text('poster'),
      episodeNo: integer('episode_no').notNull().default(1),
      duration: real('duration').notNull().default(0),
      skip: json('skip').$type(),
      filePath: text('file_path').notNull(),
      fileType: text('file_type').notNull(),
      fileSize: real('file_size').notNull(),
      chunkSize: real('chunk_size').notNull().default(0),
      isActive: boolean('is_active').default(true),
      ...sharedTimestampConumns
    },
    (self) => [index().on(self.title), index().on(self.episodeNo)]
  )
  .enableRLS()

export const watch = useSchema
  .table('watch_history', {
    id: uuid('id').defaultRandom().primaryKey(),
    accountId: integer('account_id')
      .notNull()
      .references(() => accounts.id, { onDelete: 'cascade' }),
    trackId: integer('track_id')
      .notNull()
      .references(() => tracks.id, { onDelete: 'cascade' }),
    progress: real('progress'), // In seconds
    isCompleted: boolean('is_completed').default(false),
    watchedAt: timestamp('watched_at', { precision: 6, withTimezone: true }).defaultNow(),
    ...sharedTimestampConumns
  })
  .enableRLS()

export const genres = useSchema
  .table(
    'genres',
    {
      id: serial('id').primaryKey(),
      group: text('group').$type<Genre.Group>().default('general'),
      text: text('text').unique(),
      isActive: boolean('is_active').default(true),
      ...sharedTimestampConumns
    },
    (self) => []
  )
  .enableRLS()

export const genresOfTitles = useSchema.table('genres_of_titles', {
  id: serial('id').primaryKey(),
  titleId: integer('title_id')
    .notNull()
    .references(() => titles.id, { onDelete: 'cascade' }),
  genreId: integer('genre_id')
    .notNull()
    .references(() => genres.id, { onDelete: 'cascade' }),
  ...sharedTimestampConumns
})

// ********************** Relations ********************** \\

export const titlesRelations = relations(titles, ({ one, many }) => ({
  genres: many(genresOfTitles),
  tracks: many(tracks)
}))

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  title: one(titles, {
    fields: [tracks.titleId],
    references: [titles.id]
  }),
  watchHistory: many(watch)
}))

export const watchRelations = relations(watch, ({ one, many }) => ({
  title: one(titles, {
    fields: [watch.trackId],
    references: [titles.id]
  })
}))

export const genresRelations = relations(genres, ({ one, many }) => ({
  titles: many(genresOfTitles)
}))
