import { Either, right } from '@/core/either'
import { Task } from '@/domain/tasks/enterprise/entities/task'

import { TasksRepository } from '../repositories/tasks-repository'

interface FetchRecentTasksUseCaseRequest {
  page: number
}

type FetchRecentTasksUseCaseResponse = Either<
  null,
  {
    tasks: Task[]
  }
>

export class FetchRecentTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
  }: FetchRecentTasksUseCaseRequest): Promise<FetchRecentTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findManyRecent({ page })

    return right({
      tasks,
    })
  }
}
