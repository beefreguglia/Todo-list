import { DotsThreeVertical, Trash } from '@phosphor-icons/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

import { deleteTask } from '@/api/deleteTask'
import { queryClient } from '@/lib/react-query'

import { EditTaskButton } from './edit-task-tutton'

interface OptionsButtonProps {
  id: string
}

export function OptionsButton({ id }: OptionsButtonProps) {
  const { mutateAsync: remove } = useMutation({
    mutationFn: deleteTask,
  })

  async function handleDeleteTask(id: string) {
    try {
      await remove({ id })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa removida com sucesso!')
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const error = err.response?.data
        toast.error(`${error.statusCode} ${error.error}: ${error.message}`)
      } else {
        toast.error('Ocorreu um erro inesperado.')
        console.error(err)
      }
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="rounded-md bg-slate-900 transition-colors hover:bg-slate-700">
          <DotsThreeVertical className="h-5 w-5 text-slate-100" weight="bold" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="flex flex-col gap-1 overflow-hidden rounded-lg border border-slate-950 bg-slate-800 p-1 shadow-md shadow-slate-800">
          <DropdownMenu.Item asChild>
            <EditTaskButton id={id} />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => handleDeleteTask(id)}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-rose-800 p-2 text-slate-200 hover:bg-rose-700"
          >
            <Trash weight="bold" className="h-4 w-4" />
            Deletar
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Arrow className="fill-slate-800 shadow-md shadow-slate-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
