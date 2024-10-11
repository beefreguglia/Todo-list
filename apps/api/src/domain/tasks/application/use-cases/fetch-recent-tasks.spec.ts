import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { FetchRecentTasksUseCase } from './fetch-recent-tasks'

let inMemoryTasksRepository: InMemoryTasksRepository
let sut: FetchRecentTasksUseCase

describe('Fetch Recent Tasks', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new FetchRecentTasksUseCase(inMemoryTasksRepository)
  })

  it('should be able to fetch recent tasks', async () => {
    await inMemoryTasksRepository.create(
      makeTask({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryTasksRepository.create(
      makeTask({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryTasksRepository.create(
      makeTask({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.tasks).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent tasks', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryTasksRepository.create(makeTask())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.tasks).toHaveLength(2)
  })
})
