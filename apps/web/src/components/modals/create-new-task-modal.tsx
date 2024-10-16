import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createTask } from '@/api/createTask'
import { queryClient } from '@/lib/react-query'

import { ErrorMessage } from '../ui/error-message'
import { Input } from '../ui/input'

const createTaskSchema = z.object({
  content: z.string().min(3, { message: 'Mínimo 3 caracteres.' }),
})

type CreateTaskFormData = z.infer<typeof createTaskSchema>

interface CreateNewTaskModalProps {
  handleCloseModal: () => void
}

export function CreateNewTaskModal({
  handleCloseModal,
}: CreateNewTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
  })

  const { mutateAsync: registerTask } = useMutation({
    mutationFn: createTask,
  })

  async function handleCreateTask({ content }: CreateTaskFormData) {
    try {
      await registerTask({ content })

      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })

      handleCloseModal()
      toast.success('Task criada com sucesso!')
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
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90" />
      <Dialog.Content className="absolute left-[50%] top-[50%] flex w-full max-w-[500px] -translate-x-2/4 -translate-y-2/4 flex-col rounded-lg bg-slate-950 p-4 shadow-sm shadow-slate-500">
        <header className="flex items-center justify-between">
          <Dialog.Title className="text-2xl font-bold text-slate-100 outline-none">
            Criar nova tarefa
          </Dialog.Title>
          <Dialog.Close asChild>
            <X
              className="h-5 w-5 cursor-pointer self-baseline rounded-md border border-slate-500 p-1 text-slate-500 hover:border-slate-400 hover:text-slate-400"
              weight="bold"
            />
          </Dialog.Close>
        </header>
        <div className="mt-4 h-[1px] w-full rounded-md bg-slate-600"></div>
        <form
          onSubmit={handleSubmit(handleCreateTask)}
          className="mt-4 flex flex-col gap-4"
        >
          <div>
            <Input
              id="email"
              placeholder="Descreva sua tarefa"
              {...register('content')}
            />
            {errors.content?.message && (
              <ErrorMessage> {errors.content.message}</ErrorMessage>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl bg-teal-800 px-5 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-teal-700"
          >
            <Plus />
            Criar nova tarefa
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
