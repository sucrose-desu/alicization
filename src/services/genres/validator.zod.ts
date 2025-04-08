import { z } from 'zod'

import { queryValidator as query } from '@/libs/validator.zod'

const genreTypes = z.enum(['public', 'classified'])

export const paramValidator = z.object({ id: z.string().transform(Number) })

export const queryValidator = query.merge(
  z.object({
    type: z.enum(['all']).or(genreTypes).optional()
  })
)

export const createValidator = z.object({
  type: genreTypes,
  text: z.string(),
  isActive: z.boolean()
})

export const updateValidator = createValidator.partial()

export type QuerySchema = z.infer<typeof queryValidator>
export type CreateSchema = z.infer<typeof createValidator>
export type UpdateSchema = z.infer<typeof updateValidator>
