import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { PrismaClient } from '@prisma/client'
import { afterAll, beforeAll } from 'vitest'

const prisma = new PrismaClient()
const schemaId = randomUUID()

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseUrl(schemaId)
  process.env.DATABASE_URL = databaseURL

  execSync('pnpm env:load prisma migrate deploy')
})
afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId} CASCADE"`)
  await prisma.$disconnect()
})
