import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { AuthenticateUserUseCase } from '@/domain/to-do/application/use-cases/authenticate-user'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }
    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
