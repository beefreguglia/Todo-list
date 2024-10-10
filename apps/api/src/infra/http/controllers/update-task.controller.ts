import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'

const updateTaskBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type UpdateTaskBodySchema = z.infer<typeof updateTaskBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateTaskBodySchema)

const updateTaskParamSchema = z.object({
  id: z.string(),
})

type UpdateTaskParamSchema = z.infer<typeof updateTaskParamSchema>

const paramValidationPipe = new ZodValidationPipe(updateTaskParamSchema)

@Controller('/tasks/:id')
@UseGuards(JwtAuthGuard)
export class UpdateTaskController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateTaskBodySchema,
    @Param(paramValidationPipe) param: UpdateTaskParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { content, title } = body
    const { id } = param
    const { sub: userId } = user

    await this.prisma.tasks.update({
      data: {
        content,
        title,
      },
      where: {
        id,
        authorId: userId,
      },
    })
  }
}
