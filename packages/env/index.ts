import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url(),
    JWT_PRIVATE_SECRET: z.string(),
    JWT_PUBLIC_SECRET: z.string(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_PRIVATE_SECRET: process.env.JWT_PRIVATE_SECRET,
    JWT_PUBLIC_SECRET: process.env.JWT_PUBLIC_SECRET,
  },
  emptyStringAsUndefined: true,
})
