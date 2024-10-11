import { SignInForm } from '@/components/auth/sign-in-form'
import AuthLayout from '@/components/layouts/auth-layout'

export default function SignIn() {
  return (
    <AuthLayout>
      <main className="flex h-full items-center justify-center overflow-hidden rounded-md py-20">
        <div className="w-full rounded-lg p-4 lg:w-[500px]">
          <h1 className="text-2xl font-bold text-slate-100">Faça seu Login</h1>
          <SignInForm />
        </div>
      </main>
    </AuthLayout>
  )
}
