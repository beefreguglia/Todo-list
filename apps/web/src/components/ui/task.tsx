import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'

import { OptionsButton } from './options-button'

interface TaskProps {
  task: {
    title: string
    content: string
    createdAt: Date
    finishedAt?: Date | null
    checked: boolean
    id: string
    fieldIndex: number
  }
}

export function Task({ task }: TaskProps) {
  const { control } = useFormContext()

  return (
    <div className="w-[99%] rounded-md bg-slate-950 p-3 text-slate-100">
      <div className="flex items-center justify-between">
        <Controller
          name={`interval.${task.fieldIndex}.checked`}
          control={control}
          render={({ field }) => (
            <Checkbox
              id={task.id}
              label={task.content}
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked === true)
              }}
            />
          )}
        />

        <OptionsButton />
      </div>
    </div>
  )
}
