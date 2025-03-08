import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  json,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'

import { sharedTimestampConumns } from '../utils'
import { accounts } from './accounts.schema'

export const titles = pgTable(
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
).enableRLS()

export const tracks = pgTable(
  'tracks',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    titleId: integer('title_id')
      .notNull()
      .references(() => titles.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    description: text('description'),
    poster: text('poster'),
    episodeNo: integer('episode_no').notNull().default(1),
    duration: real('duration').notNull().default(0),
    skip: json('skip').$type<any>(),
    filePath: text('file_path').notNull(),
    fileType: text('file_type').notNull(),
    fileSize: real('file_size').notNull(),
    chunkSize: real('chunk_size').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    ...sharedTimestampConumns
  },
  (self) => [index().on(self.title), index().on(self.episodeNo)]
).enableRLS()

export const genres = pgTable('genres', {
  id: serial('id').primaryKey(),
  group: text('group').notNull().$type<Genre.Group>().default('public'),
  text: text('text').notNull().unique(),
  isActive: boolean('is_active').notNull().default(true),
  ...sharedTimestampConumns
}).enableRLS()

export const genresWithTitles = pgTable('genres_with_titles', {
  id: serial('id').primaryKey(),
  titleId: integer('title_id')
    .notNull()
    .references(() => titles.id, { onDelete: 'cascade' }),
  genreId: integer('genre_id')
    .notNull()
    .references(() => genres.id, { onDelete: 'cascade' }),
  ...sharedTimestampConumns
})

export const watch = pgTable('watch_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  accountId: integer('account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  trackId: integer('track_id')
    .notNull()
    .references(() => tracks.id, { onDelete: 'cascade' }),
  progress: real('progress').notNull().default(0), // In seconds
  isCompleted: boolean('is_completed').notNull().default(false),
  watchedAt: timestamp('watched_at', { precision: 6, withTimezone: true }).defaultNow(),
  ...sharedTimestampConumns
}).enableRLS()

// ********************** Relations ********************** \\

export const titlesRelations = relations(titles, ({ many }) => ({
  genres: many(genresWithTitles),
  tracks: many(tracks)
}))

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  title: one(titles, {
    fields: [tracks.titleId],
    references: [titles.id]
  }),
  watchHistory: many(watch)
}))

export const watchRelations = relations(watch, ({ one }) => ({
  title: one(titles, {
    fields: [watch.trackId],
    references: [titles.id]
  })
}))

export const genresRelations = relations(genres, ({ many }) => ({
  titles: many(genresWithTitles)
}))
