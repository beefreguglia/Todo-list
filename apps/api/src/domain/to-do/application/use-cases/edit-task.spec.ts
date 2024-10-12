import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

import { EditTaskUseCase } from './edit-task'

let inMemoryTasksRepository: InMemoryTasksRepository
let sut: EditTaskUseCase

describe('Edit Task', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()

    sut = new EditTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to edit a task', async () => {
    const newTask = makeTask(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('task-1'),
    )

    await inMemoryTasksRepository.create(newTask)

    await sut.execute({
      taskId: newTask.id.toValue(),
      authorId: 'author-1',
      content: 'Task teste',
    })

    expect(inMemoryTasksRepository.items[0]).toMatchObject({
      content: 'Task teste',
    })
  })

  it('should not be able to edit a task from another user', async () => {
    const newTask = makeTask(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('task-1'),
    )

    await inMemoryTasksRepository.create(newTask)

    const result = await sut.execute({
      taskId: newTask.id.toValue(),
      authorId: 'author-2',
      content: 'Task teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
