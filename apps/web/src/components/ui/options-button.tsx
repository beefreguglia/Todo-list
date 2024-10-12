import { DotsThreeVertical } from '@phosphor-icons/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function OptionsButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="rounded-md bg-slate-900 p-1">
          <DotsThreeVertical className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="overflow-hidden rounded-lg border border-slate-950 bg-slate-800 px-1 py-2 shadow-md shadow-slate-800">
          <DropdownMenu.Item className="w-full cursor-pointer rounded-md px-2 py-1 text-slate-200 hover:bg-slate-950">
            Editar
          </DropdownMenu.Item>
          <DropdownMenu.Item className="w-full cursor-pointer rounded-md px-2 py-1 text-rose-800 hover:bg-slate-950">
            Deletar
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Arrow className="fill-slate-800 shadow-md shadow-slate-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
