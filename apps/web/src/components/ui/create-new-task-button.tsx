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
        <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-teal-400 transition-colors hover:bg-slate-900">
          <Plus weight="bold" />
          <p>Criar nova tarefa</p>
        </button>
      </Dialog.Trigger>
      <CreateNewTaskModal handleCloseModal={handleCloseModal} />
    </Dialog.Root>
  )
}
