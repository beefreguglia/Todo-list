import { api } from '@/lib/axios'

export interface EditTaskBody {
  content: string
  id: string
}

export async function editTask({ content, id }: EditTaskBody) {
  await api.put(`/tasks/${id}`, { content })
}
