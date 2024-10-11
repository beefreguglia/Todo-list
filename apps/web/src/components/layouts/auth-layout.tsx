import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description: string
}
export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen grid-cols-1 gap-5 overflow-hidden bg-slate-950 p-5 lg:grid-cols-[1fr_30rem]">
      <div className="w-full rounded-md">{children}</div>
      <aside className="hidden flex-col rounded-md bg-slate-900 px-8 py-20 shadow-md shadow-slate-900 lg:flex">
        <h2 className="z-10 p-1 font-sans text-2xl font-medium text-slate-200">
          {title}
        </h2>
        <p className="mt-2 p-1 text-lg text-slate-400">{description}</p>
      </aside>
    </main>
  )
}
