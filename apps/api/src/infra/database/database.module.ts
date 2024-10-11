import { Module } from '@nestjs/common'

import { TasksRepository } from '@/domain/to-do/application/repositories/tasks-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaTasksRepository } from './prisma/repositories/prisma-task-repository'

@Module({
  providers: [
    PrismaService,
    { provide: TasksRepository, useClass: PrismaTasksRepository },
  ],
  exports: [PrismaService, TasksRepository],
})
export class DatabaseModule {}
