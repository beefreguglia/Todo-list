import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import { getTasks, TaskData } from '@/api/getTasks'
import { Pagination } from '@/components/ui/pagination'
import { Task } from '@/components/ui/task'

interface TaskWithChecked {
  taskId: string
  title: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
  finishedAt?: Date | null
  checked: boolean
}

export function TodoList() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: tasks } = useQuery<TaskData[]>({
    queryKey: ['tasks', 0],
    queryFn: () => getTasks({ page: 1 }),
  })

  const methods = useForm({
    defaultValues: {
      tasks: [] as TaskWithChecked[],
    },
  })
  const { control } = methods

  const { fields, append } = useFieldArray({
    control,
    name: 'tasks',
  })

  function handlePaginate(pageIndex: number) {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', (pageIndex + 1).toString())
    router.push(`/?${newSearchParams.toString()}`)
  }

  useEffect(() => {
    if (tasks && tasks?.length > 0) {
      const data: TaskWithChecked[] =
        tasks?.map((task) => ({
          content: task.content,
          title: task.title,
          createdAt: task.createdAt,
          finishedAt: task.finishedAt,
          checked: task?.finishedAt !== null,
          taskId: task.id,
        })) ?? []
      data.forEach((task) => {
        const taskIdExists = fields.some(
          (field) => field.taskId === task.taskId,
        )

        if (!taskIdExists) {
          append(task)
        }
      })
    }
  }, [tasks])

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex max-h-[80vh] flex-col gap-2 overflow-y-auto">
          {fields &&
            fields.map(
              (
                { content, title, createdAt, finishedAt, id, checked },
                index,
              ) => (
                <Task
                  key={id}
                  task={{
                    content,
                    createdAt,
                    checked,
                    title,
                    finishedAt,
                    id,
                    fieldIndex: index,
                  }}
                />
              ),
            )}
        </form>
      </FormProvider>
      {tasks && (
        <Pagination
          onPageChange={handlePaginate}
          pageIndex={0}
          totalCount={10}
          perPage={10}
        />
      )}
    </>
  )
}
