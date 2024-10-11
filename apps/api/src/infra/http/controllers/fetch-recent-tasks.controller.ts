import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

const PER_PAGE = 20

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class FetchTaskController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @CurrentUser() user: UserPayload,
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
  ) {
    const { sub: userId } = user
    const tasks = await this.prisma.tasks.findMany({
      take: PER_PAGE,
      skip: (page - 1) * PER_PAGE,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        finishedAt: true,
      },
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      tasks,
    }
  }
}
