import { z } from 'zod'

import { defQueryStatus, defQueryTiers } from '@/constants'
import { queryValidator as query } from '@/libs/validator.zod'

export const paramValidator = z.object({ id: z.string().transform(Number) })

export const queryValidator = query.omit({ status: true }).merge(
  z.object({
    tier: defQueryTiers.optional(),
    status: defQueryStatus.or(z.enum(['verified', 'unverified', 'suspended'])).optional()
  })
)

const profileValidator = z.object({
  email: z.string().email(),
  phoneNo: z.string().length(10),
  displayName: z.string(),
  bio: z.string().optional()
})

export const createValidator = z.object({
  roleId: z.number(),
  username: z.string(),
  password: z.string(),
  isActive: z.boolean(),
  isVerified: z.boolean(),
  profile: profileValidator
})

export const updateValidator = createValidator
  .omit({ roleId: true, password: true, profile: true })
  .merge(z.object({ profile: profileValidator.partial() }))
  .partial()

export type QuerySchema = z.infer<typeof queryValidator>
export type CreateSchema = z.infer<typeof createValidator>
export type UpdateSchema = z.infer<typeof updateValidator>
