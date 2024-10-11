import { SignUpForm } from '@/components/auth/sign-up-form'
import AuthLayout from '@/components/layouts/auth-layout'

export default function SignIn() {
  return (
    <AuthLayout
      title="Crie a sua to-do list para melhorar sua proatividade!"
      description="Crie sua conta para começar a utilizar"
    >
      <main className="flex h-full items-center justify-center overflow-hidden rounded-md py-20">
        <div className="w-full rounded-lg p-4 lg:w-[500px]">
          <h1 className="text-2xl font-bold text-slate-100">Crie sua conta</h1>
          <SignUpForm />
        </div>
      </main>
    </AuthLayout>
  )
}
