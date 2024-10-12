import { SignOut } from '@phosphor-icons/react'

import { removeAuthTokenCookie } from '@/lib/auth'

export function LogOutButton() {
  function handleLogOut() {
    removeAuthTokenCookie(null)
  }

  return (
    <a
      href="/sign-in"
      onClick={handleLogOut}
      className="flex w-full cursor-pointer items-center gap-2 rounded-3xl bg-rose-800 px-5 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-rose-700"
    >
      <SignOut className="h-4 w-4" weight="bold" />
      <span className="hidden lg:block">Sair</span>
    </a>
  )
}
