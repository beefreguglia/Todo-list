import { Pencil } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

import { EditTaskModal } from '../modals/edit-task-modal'

interface EditTaskButtonProps {
  id: string
}

export function EditTaskButton({ id }: EditTaskButtonProps) {
  const [open, setOpen] = useState(false)

  function handleCloseModal() {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-slate-200 hover:bg-slate-950">
          <Pencil weight="bold" className="h-4 w-4" />
          Editar
        </button>
      </Dialog.Trigger>
      <EditTaskModal id={id} handleCloseModal={handleCloseModal} />
    </Dialog.Root>
  )
}
