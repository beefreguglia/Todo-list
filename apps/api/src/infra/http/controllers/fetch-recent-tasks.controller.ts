import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { FetchRecentTasksUseCase } from '@/domain/to-do/application/use-cases/fetch-recent-tasks'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { PrismaTaskMapper } from '@/infra/database/prisma/mappers/prisma-task-mapper'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

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

    const data = await this.fetchRecentTasks.execute({
      page,
      userId,
    })

    const tasks = data.value?.tasks.map((task) =>
      PrismaTaskMapper.toPrisma(task),
    )

    return {
      tasks,
    }
  }
}
