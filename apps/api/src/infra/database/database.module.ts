import { Module } from '@nestjs/common'

import { TasksRepository } from '@/domain/to-do/application/repositories/tasks-repository'
import { UsersRepository } from '@/domain/to-do/application/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaTasksRepository } from './prisma/repositories/prisma-task-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repostory'

@Module({
  providers: [
    PrismaService,
    { provide: TasksRepository, useClass: PrismaTasksRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [PrismaService, TasksRepository, UsersRepository],
})
export class DatabaseModule {}
