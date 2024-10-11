import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'

import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create Task (E2E)', () => {
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

  test('[POST] /tasks', async () => {
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

    const access_token = JWT.sign({ sub: user.id })

    const title = 'New task title'
    const content = 'Task content'

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title,
        content,
      })

    expect(response.statusCode).toBe(201)

    const taskOnDatabase = await prisma.tasks.findFirst({
      where: {
        title,
      },
    })

    expect(taskOnDatabase).toBeTruthy()
  })
})
