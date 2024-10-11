import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { DeleteTaskUseCase } from '@/domain/to-do/application/use-cases/delete-task'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const removeTaskParamSchema = z.object({
  id: z.string(),
})

type RemoveTaskParamSchema = z.infer<typeof removeTaskParamSchema>

const paramValidationPipe = new ZodValidationPipe(removeTaskParamSchema)

@Controller('/tasks/:id')
@UseGuards(JwtAuthGuard)
export class RemoveTaskController {
  constructor(private deleteTask: DeleteTaskUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param(paramValidationPipe) param: RemoveTaskParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { id } = param
    const { sub: userId } = user

    await this.deleteTask.execute({ authorId: userId, taskId: id })
  }
}
