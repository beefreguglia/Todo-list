import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/tasks/enterprise/entities/task'

import { TasksRepository } from '../repositories/tasks-repository'

interface CreateTaskUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type CreateTaskUseCaseResponse = Either<
  null,
  {
    task: Task
  }
>

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = Task.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.tasksRepository.create(task)

    return right({
      task,
    })
  }
}
