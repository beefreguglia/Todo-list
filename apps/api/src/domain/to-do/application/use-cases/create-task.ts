import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/to-do/enterprise/entities/task'

import { TasksRepository } from '../repositories/tasks-repository'

interface CreateTaskUseCaseRequest {
  authorId: string
  content: string
}

type CreateTaskUseCaseResponse = Either<
  null,
  {
    task: Task
  }
>

@Injectable()
export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    authorId,
    content,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = Task.create({
      authorId: new UniqueEntityID(authorId),
      content,
    })

    await this.tasksRepository.create(task)

    return right({
      task,
    })
  }
}
