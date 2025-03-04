import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: '.env' })

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema/*.schema.ts',
  out: './src/drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  introspect: {
    casing: 'camel'
  }
})
