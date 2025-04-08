import { z } from 'zod'

export const paramValidator = z.object({ id: z.any() })

export const queryValidator = z.object({
  page: z.string().default('1').transform(Number),
  take: z.string().default('10').transform(Number),
  status: z.enum(['all', 'active', 'inactive']).optional(),
  search: z.string().optional()
})

export type QuerySchema = z.infer<typeof queryValidator>
