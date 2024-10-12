import Layout from '@/components/layouts/layout'
import { Task } from '@/components/ui/task'

export default function Home() {
  return (
    <Layout>
      <div className="m-auto mt-5 flex max-w-[800px] flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold text-slate-100">Olá Bernardo✌️</h1>
        <Task />
      </div>
    </Layout>
  )
}
