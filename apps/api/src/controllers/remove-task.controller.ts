import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jwt.strategy'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

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
