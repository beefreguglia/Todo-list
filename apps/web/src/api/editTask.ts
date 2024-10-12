import { api } from '@/lib/axios'

export interface EditTaskBody {
  content: string
  finishedAt?: Date | null
  id: string
}

export async function editTask({ content, finishedAt, id }: EditTaskBody) {
  await api.put(`/tasks/${id}`, { content, finished_at: finishedAt })
}
