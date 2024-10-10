import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jwt.strategy'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

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
