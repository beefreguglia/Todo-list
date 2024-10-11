import { makeTask } from 'test/factories/make-task'
import { makeUser } from 'test/factories/make-user'
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
    const user = makeUser()

    await inMemoryTasksRepository.create(
      makeTask({ createdAt: new Date(2022, 0, 20), authorId: user.id }),
    )
    await inMemoryTasksRepository.create(
      makeTask({ createdAt: new Date(2022, 0, 18), authorId: user.id }),
    )
    await inMemoryTasksRepository.create(
      makeTask({ createdAt: new Date(2022, 0, 23), authorId: user.id }),
    )

    const result = await sut.execute({
      page: 1,
      userId: user.id.toString(),
    })

    expect(result.value?.tasks).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent tasks', async () => {
    const user = makeUser()

    for (let i = 1; i <= 22; i++) {
      await inMemoryTasksRepository.create(makeTask())
    }

    const result = await sut.execute({
      page: 2,
      userId: user.id.toString(),
    })

    expect(result.value?.tasks).toHaveLength(2)
  })
})
