import AuthLayout from '@/components/layouts/auth-layout'
import { Input } from '@/components/ui/input'

export default function SignIn() {
  return (
    <AuthLayout>
      <main className="flex h-full items-center justify-center overflow-hidden rounded-md py-20">
        <div className="w-full rounded-lg p-4 text-slate-300 lg:w-[500px]">
          <h1 className="text-2xl font-bold">Faça seu Login</h1>
          <form className="mt-8 w-full">
            <div>
              <label htmlFor="" className="block pb-2">
                E-mail
              </label>
              <Input type="email" placeholder="example@example.com" />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="block pb-2">
                Password
              </label>
              <Input type="password" />
            </div>
          </form>
        </div>
      </main>
    </AuthLayout>
  )
}
