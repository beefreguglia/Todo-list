import { TodoList } from '@/components/home/to-do-list'
import Layout from '@/components/layouts/layout'

export default function Home() {
  return (
    <Layout>
      <div className="m-auto mt-5 flex max-w-[800px] flex-col gap-4 overflow-hidden p-4">
        <h1 className="text-2xl font-bold text-slate-100">Olá Bernardo✌️</h1>
        <TodoList />
      </div>
    </Layout>
  )
}
