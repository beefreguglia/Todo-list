import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '@/auth/current-user-decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'

const removeTaskParamSchema = z.object({
  id: z.string(),
})

type RemoveTaskParamSchema = z.infer<typeof removeTaskParamSchema>

const paramValidationPipe = new ZodValidationPipe(removeTaskParamSchema)

@Controller('/tasks/:id')
@UseGuards(JwtAuthGuard)
export class RemoveTaskController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param(paramValidationPipe) param: RemoveTaskParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { id } = param
    const { sub: userId } = user

    await this.prisma.tasks.delete({
      where: {
        id,
        authorId: userId,
      },
    })
  }
}
