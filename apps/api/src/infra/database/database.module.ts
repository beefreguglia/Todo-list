import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { PrismaTasksRepository } from './prisma/repositories/prisma-task-repository'

@Module({
  providers: [PrismaService, PrismaTasksRepository],
  exports: [PrismaService, PrismaTasksRepository],
})
export class DatabaseModule {}
