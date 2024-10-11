import { PaginationParams } from '@/core/repositories/pagination-params'
import { Task } from '@/domain/to-do/enterprise/entities/task'

export abstract class TasksRepository {
  abstract findById(id: string): Promise<Task | null>
  abstract findManyRecent(params: PaginationParams, id: string): Promise<Task[]>
  abstract create(task: Task): Promise<void>
  abstract save(task: Task): Promise<void>
  abstract delete(task: Task): Promise<void>
}
