import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

import { EditTaskUseCase } from '@/domain/to-do/application/use-cases/edit-task'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const updateTaskBodySchema = z.object({
  content: z.string(),
  finished_at: z.string().optional().nullable(),
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
  constructor(private editTask: EditTaskUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateTaskBodySchema,
    @Param(paramValidationPipe) param: UpdateTaskParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { content, finished_at } = body
    const { id } = param
    const { sub: userId } = user

    await this.editTask.execute({
      taskId: id,
      authorId: userId,
      content,
      finishedAt: finished_at ? new Date(finished_at) : null,
    })
  }
}
