import { TodoList } from '@/components/home/to-do-list'
import Layout from '@/components/layouts/layout'

export default function Home() {
  return (
    <Layout>
      <div className="m-auto mt-5 flex max-w-[800px] flex-col gap-4 overflow-hidden p-4">
        <h1 className="text-2xl font-bold text-slate-100">
          Olá, bem vindo a Todo List ✌️
        </h1>
        <div className="mt-4 h-[1px] w-[99%] rounded-md bg-slate-950"></div>
        <TodoList />
      </div>
    </Layout>
  )
}
