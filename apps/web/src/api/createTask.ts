import { api } from '@/lib/axios'

import { TaskData } from './getTasks'

export interface CreateTaskBody {
  content: string
}

export interface CreateTaskResponse {
  task: TaskData
}

export async function createTask({
  content,
}: CreateTaskBody): Promise<CreateTaskResponse> {
  const response = await api.post('/tasks', { content })
  const { task } = response.data
  return { task }
}
