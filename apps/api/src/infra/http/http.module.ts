import { Module } from '@nestjs/common'

import { CreateTaskUseCase } from '@/domain/to-do/application/use-cases/create-task'
import { DeleteTaskUseCase } from '@/domain/to-do/application/use-cases/delete-task'
import { EditTaskUseCase } from '@/domain/to-do/application/use-cases/edit-task'
import { FetchRecentTasksUseCase } from '@/domain/to-do/application/use-cases/fetch-recent-tasks'

import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateTaskController } from './controllers/create-task.controller'
import { FetchTaskController } from './controllers/fetch-recent-tasks.controller'
import { RemoveTaskController } from './controllers/remove-task.controller'
import { UpdateTaskController } from './controllers/update-task.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateTaskController,
    FetchTaskController,
    UpdateTaskController,
    RemoveTaskController,
  ],
  providers: [
    CreateTaskUseCase,
    EditTaskUseCase,
    DeleteTaskUseCase,
    FetchRecentTasksUseCase,
  ],
})
export class HttpModule {}
