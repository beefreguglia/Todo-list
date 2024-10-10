import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '@/auth/current-user-decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'

const createTaskBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createTaskBodySchema)

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class CreateTaskController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateTaskBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { content, title } = body
    const { sub: userId } = user

    await this.prisma.tasks.create({
      data: {
        authorId: userId,
        content,
        title,
      },
    })
  }
}
