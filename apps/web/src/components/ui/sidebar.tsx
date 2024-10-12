import { HouseLine, ListChecks } from '@phosphor-icons/react'

import { CreateNewTaskButton } from './create-new-task-button'
import { LogOutButton } from './logout-button'
import { SidebarButton } from './sidebar-item'

export function Sidebar() {
  return (
    <aside className="h-full rounded-3xl bg-slate-950 px-3 py-8 shadow-md shadow-slate-950">
      <h2 className="flex items-center gap-2 px-4 text-2xl font-bold text-slate-100">
        <ListChecks weight="bold" />
        <span className="hidden lg:block">Lista To-do</span>
      </h2>
      <div className="mt-4 h-[1px] w-full rounded-md bg-slate-800"></div>
      <div className="mt-4 flex flex-col gap-1">
        <SidebarButton
          isActive
          icon={<HouseLine className="h-4 w-4" weight="bold" />}
        >
          Home
        </SidebarButton>
        <CreateNewTaskButton />
      </div>
      <footer className="absolute bottom-8 left-4 flex flex-col gap-4 lg:w-[18.5rem]">
        <LogOutButton />
      </footer>
    </aside>
  )
}
