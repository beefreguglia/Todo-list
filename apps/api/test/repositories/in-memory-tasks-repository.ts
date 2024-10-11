import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { TasksRepository } from '@/domain/to-do/application/repositories/tasks-repository'
import { Task } from '@/domain/to-do/enterprise/entities/task'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  constructor() {}

  async findById(id: string) {
    const task = this.items.find((item) => item.id.toString() === id)

    if (!task) {
      return null
    }

    return task
  }

  async findManyRecent({ page }: PaginationParams) {
    const tasks = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return tasks
  }

  async create(task: Task) {
    this.items.push(task)

    DomainEvents.dispatchEventsForAggregate(task.id)
  }

  async save(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id)

    this.items[itemIndex] = task

    DomainEvents.dispatchEventsForAggregate(task.id)
  }

  async delete(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id)

    this.items.splice(itemIndex, 1)
  }
}
