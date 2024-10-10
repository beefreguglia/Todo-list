import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class CreateTaskController {
  constructor() {}

  @Post()
  async handle() {
    return 'ok'
  }
}
