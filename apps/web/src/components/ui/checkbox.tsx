import { Check } from '@phosphor-icons/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Label } from '@radix-ui/react-label'
import * as React from 'react'

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
}

export function Checkbox({ label, ...rest }: CheckboxProps) {
  let className =
    'h-4 w-4 cursor-pointer rounded-md border-2 border-solid border-transparent bg-slate-950 text-slate-100 outline-none ring-1 ring-slate-500 transition-colors placeholder:text-slate-400 hover:ring-teal-700 focus:ring-teal-700'

  if (rest.checked) {
    className =
      'h-4 w-4 cursor-pointer rounded-md border-2 border-solid border-transparent bg-slate-950 text-slate-100 outline-none ring-1 ring-teal-700 transition-colors placeholder:text-slate-400 hover:ring-teal-800 focus:ring-teal-800'
  }

  return (
    <div className="flex flex-1 items-center gap-2">
      <CheckboxPrimitive.Root className={className} {...rest}>
        <CheckboxPrimitive.Indicator>
          <Check className="h-3 w-3" weight="bold" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <Label
        className={rest.checked ? 'line-through' : undefined}
        htmlFor={rest.id}
      >
        <span className="text-xs lg:text-base">{label}</span>
      </Label>
    </div>
  )
}

Checkbox.displayName = CheckboxPrimitive.Root.displayName
