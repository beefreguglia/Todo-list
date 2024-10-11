import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Task } from '@/domain/to-do/enterprise/entities/task'

import { TasksRepository } from '../repositories/tasks-repository'

interface FetchRecentTasksUseCaseRequest {
  page: number
  userId: string
}

type FetchRecentTasksUseCaseResponse = Either<
  null,
  {
    tasks: Task[]
  }
>

@Injectable()
export class FetchRecentTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
    userId,
  }: FetchRecentTasksUseCaseRequest): Promise<FetchRecentTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findManyRecent({ page }, userId)

    return right({
      tasks,
    })
  }
}
