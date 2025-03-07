import { format } from 'date-fns'
import { pgSchema, timestamp, type PgSelect } from 'drizzle-orm/pg-core'

export const useSchema = pgSchema('alicization')

export const sharedTimestampConumns = {
  createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).$onUpdate(
    () => new Date()
  )
}

export function withPagination<T extends PgSelect>(
  qb: T,
  page: number = 1,
  pageSize: number = 10
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize)
}

export function consoleLog(str: string) {
  console.log(
    `\x1b[36m[${format(new Date(), 'PPpp')}]\x1b[0m -`,
    `\x1b[32m[DrizzleORM]\x1b[0m`,
    `\x1b[37m${str}\x1b[0m`
  )
}
