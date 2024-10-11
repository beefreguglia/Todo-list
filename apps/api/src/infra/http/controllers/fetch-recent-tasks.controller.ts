import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

import { FetchRecentTasksUseCase } from '@/domain/to-do/application/use-cases/fetch-recent-tasks'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { TaskPresenter } from '../presenters/task-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class FetchTaskController {
  constructor(private fetchRecentTasks: FetchRecentTasksUseCase) {}

  @Get()
  async handle(
    @CurrentUser() user: UserPayload,
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
  ) {
    const { sub: userId } = user

    const result = await this.fetchRecentTasks.execute({
      page,
      userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { tasks } = result.value

    return {
      tasks: tasks.map((task) => TaskPresenter.toHTTP(task)),
    }
  }
}
