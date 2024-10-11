import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, SignIn } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Label } from '@/components/ui/label'
import { setAuthTokenCookie } from '@/lib/auth'

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

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      const { access_token } = await authenticate({ email, password })

      setAuthTokenCookie(null, access_token)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const error = err.response?.data
        toast.error(`${error.statusCode} ${error.error}: ${error.message}`)
      } else {
        toast.error('Ocorreu um erro inesperado.')
        console.error(err)
      }
    }
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
