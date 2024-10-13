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

interface TodoListProps {
  tasks: TaskData[]
}

export function TodoList({ tasks }: TodoListProps) {
  const { data: result } = useQuery<TaskData[]>({
    queryKey: ['tasks'],
    initialData: tasks,
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
    if (result && result?.length > 0) {
      const data: TaskWithChecked[] =
        result?.map((task) => ({
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
  }, [result])

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
