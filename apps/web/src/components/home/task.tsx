import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Controller, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { editTask } from '@/api/editTask'
import { Checkbox } from '@/components/ui/checkbox'
import { queryClient } from '@/lib/react-query'

import { OptionsButton } from '../ui/options-button'

interface TaskProps {
  task: {
    content: string
    createdAt: Date
    finishedAt?: Date | null
    checked: boolean
    id: string
    fieldIndex: number
    taskId: string
  }
}

const editTaskSchema = z.object({
  content: z.string().min(3, { message: 'Mínimo 3 caracteres.' }),
  finishedAt: z.date().nullable().optional(),
})

type EditTaskFormData = z.infer<typeof editTaskSchema>

export function Task({ task }: TaskProps) {
  const { control } = useFormContext()

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: editTask,
  })

  async function handleEditTask({ content, finishedAt }: EditTaskFormData) {
    try {
      await updateTask({ content, finishedAt, id: task.taskId })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
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
    <div className="w-[99%] rounded-md bg-slate-950 p-3 text-slate-100">
      <div className="flex flex-1 items-center justify-between">
        <Controller
          name={`tasks.${task.fieldIndex}.checked`}
          control={control}
          render={({ field }) => (
            <Checkbox
              id={field.name}
              label={task.content}
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked === true)
                handleEditTask(
                  checked === true
                    ? { content: task.content, finishedAt: new Date() }
                    : { content: task.content, finishedAt: null },
                )
              }}
            />
          )}
        />

        <OptionsButton id={task.taskId} />
      </div>
    </div>
  )
}
