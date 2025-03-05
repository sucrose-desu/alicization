import { z } from 'zod'

const envSchema = z.object({
  APP_MODE: z
    .union([z.literal('production'), z.literal('development'), z.literal('local')])
    .default('local'),
  APP_NAME: z.string().default('project_name'),
  APP_BASE_URL: z.string().default('http://www.example.com'),
  API_GATEWAY: z.string().default('https://api.example.com'),
  TZ: z.string().default('Asia/Bangkok')
})

const jwtSchema = z.object({
  JWT_SECRET: z.string().default('your-secret-key'),
  JWT_TTL: z.string().default('1h')
})

export const ENV = envSchema.parse({
  APP_MODE: process.env.NEXT_PUBLIC_APP_MODE,
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  APP_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  API_GATEWAY: process.env.NEXT_PUBLIC_API_GATEWAY,
  TZ: process.env.NEXT_PUBLIC_APP_TZ
})

export const JWT = jwtSchema.parse({
  secret: process.env.JWT_SECRET,
  ttl: process.env.JWT_TTL
})

export const DATABASE_URL = String(process.env.DATABASE_URL || '')
