import { Plus } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

import { CreateNewTaskModal } from '../modals/create-new-task-modal'

export function CreateNewTaskButton() {
  const [open, setOpen] = useState(false)

  function handleCloseModal() {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-slate-950 px-4 py-4 text-sm font-medium text-teal-400 transition-colors hover:bg-slate-900 lg:px-5 lg:py-3">
          <Plus className="h-4 w-4" weight="bold" />
          <p className="hidden lg:block">Criar nova tarefa</p>
        </button>
      </Dialog.Trigger>
      <CreateNewTaskModal handleCloseModal={handleCloseModal} />
    </Dialog.Root>
  )
}
