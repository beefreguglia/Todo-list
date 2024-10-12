import { api } from '@/lib/axios'

interface getTasksParams {
  id: string
}

export async function deleteTask({ id }: getTasksParams) {
  await api.delete(`/tasks/${id}`)
}
