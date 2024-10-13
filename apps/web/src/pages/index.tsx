import { GetServerSideProps } from 'next'
import nookies from 'nookies'

import { GetTasksResponse, TaskData } from '@/api/getTasks'
import { TodoList } from '@/components/home/to-do-list'
import Layout from '@/components/layouts/layout'
import { api } from '@/lib/axios'

interface HomeProps {
  tasks: TaskData[]
}

export default function Home({ tasks }: HomeProps) {
  return (
    <Layout>
      <div className="m-auto mt-5 flex max-w-[800px] flex-col gap-4 overflow-hidden p-4">
        <h1 className="text-2xl font-bold text-slate-100">
          Olá, bem vindo a Todo List ✌️
        </h1>
        <div className="mt-4 h-[1px] w-[99%] rounded-md bg-slate-950"></div>
        <TodoList tasks={tasks} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { todoToken } = nookies.get(ctx)

    const response = await api.get<GetTasksResponse>('/tasks', {
      headers: {
        Authorization: `Bearer ${todoToken}`,
      },
    })

    const { tasks } = response.data
    return {
      props: {
        tasks,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        tasks: [],
      },
    }
  }
}
