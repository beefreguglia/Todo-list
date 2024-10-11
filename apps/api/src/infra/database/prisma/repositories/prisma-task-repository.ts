import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { TasksRepository } from '@/domain/to-do/application/repositories/tasks-repository'
import { Task } from '@/domain/to-do/enterprise/entities/task'

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  findById(id: string): Promise<Task | null> {
    throw new Error('Method not implemented.')
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
