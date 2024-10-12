import { api } from '@/lib/axios'

export interface TaskData {
  id: string
  authorId: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
  finishedAt?: Date | null
}

export interface GetTasksResponse {
  tasks: TaskData[]
}

interface getTasksParams {
  page: number
}

export async function getTasks({ page }: getTasksParams): Promise<TaskData[]> {
  const response = await api.get<GetTasksResponse>('/tasks', {
    params: {
      page,
    },
  })

  return response.data.tasks
}
