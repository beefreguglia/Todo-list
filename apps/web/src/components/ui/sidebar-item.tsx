import { ButtonHTMLAttributes, ReactNode } from 'react'

interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  children: ReactNode
  isActive?: boolean
}

export function SidebarButton({
  children,
  icon,
  isActive = false,
  ...rest
}: SidebarButtonProps) {
  let className =
    'flex w-full cursor-pointer items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-900'
  if (isActive) {
    className =
      'flex w-full cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800'
  }
  return (
    <button className={className} {...rest}>
      {icon}
      {children}
    </button>
  )
}
