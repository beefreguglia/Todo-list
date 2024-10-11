import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'

import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Remove Task (E2E)', () => {
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

  test('[DELETE] /tasks/:id', async () => {
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

    const task = await prisma.tasks.create({
      data: {
        title: 'Task 01',
        content: 'task 01',
        authorId: user.id,
      },
    })

    const access_token = JWT.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .delete(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(204)

    const tasksOnDatabase = await prisma.tasks.findMany({
      where: {
        id: task.id,
        authorId: user.id,
      },
    })

    expect(tasksOnDatabase).toEqual([])
  })
})
