import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Task } from '@/domain/to-do/enterprise/entities/task'

import { TasksRepository } from '../repositories/tasks-repository'

interface EditTaskUseCaseRequest {
  authorId: string
  taskId: string
  title: string
  content: string
  finishedAt: Date | null | undefined
}

type EditTaskUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    task: Task
  }
>

@Injectable()
export class EditTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    authorId,
    taskId,
    title,
    content,
    finishedAt,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== task.authorId.toString()) {
      return left(new NotAllowedError())
    }

    task.title = title
    task.content = content
    task.finishedAt = finishedAt

    await this.tasksRepository.save(task)

    return right({
      task,
    })
  }
}
