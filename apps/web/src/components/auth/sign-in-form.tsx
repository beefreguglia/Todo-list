import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, SignIn } from '@phosphor-icons/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Label } from '@/components/ui/label'

import { Button } from '../ui/button'
import { ErrorMessage } from '../ui/error-message'
import { Input } from '../ui/input'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres.' }),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn({ email, password }: SignInFormData) {
    console.log(email, password)
  }

  return (
    <form
      className="mt-8 flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          placeholder="example@example.com"
          {...register('email')}
        />
        {errors.email?.message && (
          <ErrorMessage> {errors.email.message}</ErrorMessage>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" {...register('password')} />
        {errors.password?.message && (
          <ErrorMessage> {errors.password.message}</ErrorMessage>
        )}
      </div>
      <Link
        className="flex items-center gap-1 self-end text-sm text-slate-300 underline transition-colors hover:text-slate-100"
        href="/sign-up"
      >
        <Plus weight="bold" />
        Voltar para página de login
      </Link>
      <Button disabled={isSubmitting}>
        <SignIn className="h-4 w-4" weight="bold" />
        Login
      </Button>
    </form>
  )
}
