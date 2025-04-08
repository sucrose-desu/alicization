'use server'

import { schema, withPagination, type Genre } from '@alicization-hub/db-schema'
import { and, count, eq, SQL } from 'drizzle-orm'

import { db } from '@/drizzle'
import { isNotEqual } from '@/libs/utils'

import type { CreateSchema, QuerySchema, UpdateSchema } from './validator.zod'

export async function findGenres(query: QuerySchema): Promise<[number, Genre[]]> {
  const filters: SQL[] = []

  if (isNotEqual('all', query?.type)) {
    filters.push(eq(schema.genres.type, query.type as Genre.Type))
  }

  if (isNotEqual('all', query?.status)) {
    filters.push(eq(schema.genres.isActive, query.status === 'active'))
  }

  return db.transaction(async (tx) => {
    const queryBuilder = tx
      .select()
      .from(schema.genres)
      .where(and(...filters))
      .$dynamic()

    const queryCountBuilder = tx
      .select({ count: count() })
      .from(schema.genres)
      .where(and(...filters))
      .$dynamic()

    const results = await withPagination(queryBuilder, query.page, query.take).execute()
    const [r] = await queryCountBuilder.execute()

    return [+r.count, results]
  })
}

export async function findGenre(id: number) {
  return db.select().from(schema.genres).where(eq(schema.genres.id, id))
}

export async function createGenre(values: CreateSchema) {
  return db.insert(schema.genres).values(values).returning()
}

export async function updateGenre(id: number, values: UpdateSchema) {
  return db.update(schema.genres).set(values).where(eq(schema.genres.id, id))
}

export async function deleteGenre(id: number) {
  return db.delete(schema.genres).where(eq(schema.genres.id, id))
}
