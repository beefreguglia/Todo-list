import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

import { DeleteTaskUseCase } from './delete-task'

let inMemoryTasksRepository: InMemoryTasksRepository
let sut: DeleteTaskUseCase

describe('Delete Task', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()

    sut = new DeleteTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to delete a task', async () => {
    const newTask = makeTask(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('task-1'),
    )

    await inMemoryTasksRepository.create(newTask)

    await sut.execute({
      taskId: 'task-1',
      authorId: 'author-1',
    })

    expect(inMemoryTasksRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a task from another user', async () => {
    const newTask = makeTask(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('task-1'),
    )

    await inMemoryTasksRepository.create(newTask)

    const result = await sut.execute({
      taskId: 'task-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
