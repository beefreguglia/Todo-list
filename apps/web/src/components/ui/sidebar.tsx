import { Check, HouseLine } from '@phosphor-icons/react'

import { CreateNewTaskButton } from './create-new-task-button'
import { LogOutButton } from './logout-button'
import { SidebarButton } from './sidebar-item'

export function Sidebar() {
  return (
    <aside className="h-full rounded-3xl bg-slate-950 px-3 py-8 shadow-md shadow-slate-950">
      <h2 className="text-2xl font-bold text-slate-100">Lista To-do</h2>
      <div className="mt-4 h-[1px] w-full rounded-md bg-slate-800"></div>
      <div className="mt-4 flex flex-col gap-1">
        <SidebarButton isActive icon={<HouseLine weight="bold" />}>
          Home
        </SidebarButton>
        <SidebarButton icon={<Check weight="bold" />}>Concluídos</SidebarButton>
        <CreateNewTaskButton />
      </div>
      <footer className="absolute bottom-8 flex w-[18.5rem] flex-col gap-4">
        <LogOutButton />
      </footer>
    </aside>
  )
}
