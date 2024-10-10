import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateTaskController } from './controllers/create-task.controller'
import { FetchTaskController } from './controllers/fetch-recent-tasks.controller'
import { UpdateTaskController } from './controllers/update-task.controller'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateTaskController,
    FetchTaskController,
    UpdateTaskController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
