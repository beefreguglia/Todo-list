import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

import { isAuthenticated } from '@/lib/auth'

import { Sidebar } from '../ui/sidebar'
interface AuthLayoutProps {
  children: ReactNode
}
export default function Layout({ children }: AuthLayoutProps) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated(null)) {
      router.push('/sign-in')
    }
  }, [router])

  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] overflow-hidden bg-slate-900 px-2 py-4">
      <Sidebar />
      <div>{children}</div>
    </div>
  )
}
