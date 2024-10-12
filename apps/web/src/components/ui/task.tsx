import { Checkbox } from '@/components/ui/checkbox'

import { OptionsButton } from './options-button'

export function Task() {
  return (
    <div className="rounded-md bg-slate-950 p-3 text-slate-100">
      <div className="flex items-center justify-between">
        <Checkbox checked id="task1" label="task1" />
        <OptionsButton />
      </div>
    </div>
  )
}
