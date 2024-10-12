import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'

import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Fetch recent Tasks (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let JWT: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    JWT = moduleRef.get(JwtService)

    app.init()
  })

  test('[GET] /tasks', async () => {
    const name = 'John Doe'
    const email = 'johndoe@example.com'
    const password = '123456'

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await hash(password, 8),
      },
    })

    await prisma.tasks.createMany({
      data: [
        {
          content: 'Task 01',
          authorId: user.id,
        },
        {
          content: 'Task 02',
          authorId: user.id,
        },
      ],
    })

    const access_token = JWT.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      tasks: [
        expect.objectContaining({ content: 'Task 01' }),
        expect.objectContaining({ content: 'Task 02' }),
      ],
    })
  })
})
