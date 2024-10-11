import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { TasksRepository } from '@/domain/to-do/application/repositories/tasks-repository'
import { Task } from '@/domain/to-do/enterprise/entities/task'

import { PrismaTaskMapper } from '../mappers/prisma-task-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id,
      },
    })

    if (!task) {
      return null
    }

    return PrismaTaskMapper.toDomain(task)
  }

  findManyRecent(params: PaginationParams): Promise<Task[]> {
    throw new Error('Method not implemented.')
  }

  create(task: Task): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(task: Task): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(task: Task): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
