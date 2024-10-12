import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateTaskUseCase } from './create-task'

let inMemoryTasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe('Create Task', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to create a task', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Conteúdo da Task',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryTasksRepository.items[0]).toEqual(result.value?.task)
  })
})
