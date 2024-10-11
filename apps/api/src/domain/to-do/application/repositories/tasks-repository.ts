import { PaginationParams } from '@/core/repositories/pagination-params'
import { Task } from '@/domain/to-do/enterprise/entities/task'

export interface TasksRepository {
  findById(id: string): Promise<Task | null>
  findManyRecent(params: PaginationParams): Promise<Task[]>
  create(task: Task): Promise<void>
  save(task: Task): Promise<void>
  delete(task: Task): Promise<void>
}
