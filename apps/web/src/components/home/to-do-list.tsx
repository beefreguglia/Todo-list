import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import { getTasks, TaskData } from '@/api/getTasks'
import { Task } from '@/components/home/task'

interface TaskWithChecked {
  taskId: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
  finishedAt?: Date | null
  checked: boolean
}

export function TodoList() {
  const { data: tasks } = useQuery<TaskData[]>({
    queryKey: ['tasks', 0],
    queryFn: () => getTasks({ page: 1 }),
  })

  const methods = useForm({
    defaultValues: {
      tasks: [] as TaskWithChecked[],
    },
  })
  const { control, reset } = methods

  const { fields, append } = useFieldArray({
    control,
    name: 'tasks',
  })

  useEffect(() => {
    if (tasks && tasks?.length > 0) {
      const data: TaskWithChecked[] =
        tasks?.map((task) => ({
          content: task.content,
          createdAt: task.createdAt,
          finishedAt: task.finishedAt,
          checked: task?.finishedAt !== null,
          taskId: task.id,
        })) ?? []
      reset({ tasks: [] })
      data.forEach((task) => {
        append(task)
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
                { content, createdAt, finishedAt, id, checked, taskId },
                index,
              ) => (
                <Task
                  key={id}
                  task={{
                    content,
                    taskId,
                    createdAt,
                    checked,
                    finishedAt,
                    id,
                    fieldIndex: index,
                  }}
                />
              ),
            )}
        </form>
      </FormProvider>
      {/* {tasks && (
        <Pagination
          onPageChange={handlePaginate}
          pageIndex={0}
          totalCount={10}
          perPage={10}
        />
      )} */}
    </>
  )
}
