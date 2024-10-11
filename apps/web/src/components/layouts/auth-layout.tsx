import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen grid-cols-1 gap-5 overflow-hidden bg-slate-950 p-5 lg:grid-cols-[30rem_1fr]">
      <aside className="hidden flex-col rounded-md bg-slate-900 px-8 py-20 text-end shadow-lg lg:flex">
        <h2 className="z-10 p-1 font-sans text-2xl font-medium text-slate-200">
          Crie a sua to-do list para melhorar sua proatividade!
        </h2>
        <p className="mt-2 p-1 text-lg text-slate-400">
          Faça o login e aproveite!
        </p>
      </aside>
      <div className="w-full rounded-md">{children}</div>
    </main>
  )
}
