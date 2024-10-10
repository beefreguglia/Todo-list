import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateTaskController } from './controllers/create-task.controller'
import { FetchTaskController } from './controllers/fetch-recent-tasks.controller'
import { RemoveTaskController } from './controllers/remove-task.controller'
import { UpdateTaskController } from './controllers/update-task.controller'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateTaskController,
    FetchTaskController,
    UpdateTaskController,
    RemoveTaskController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
