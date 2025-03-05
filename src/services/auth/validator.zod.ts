import { z } from 'zod'

export const signInSchema = z.object({
  username: z.string().length(16),
  password: z.string().min(8).max(16),
  keepLoggedIn: z.boolean().optional()
})

export type SignInSchema = z.infer<typeof signInSchema>
