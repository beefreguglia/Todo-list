import { api } from '@/lib/axios'

export interface SignUpBody {
  email: string
  password: string
  name: string
}

export async function signUp({ email, password, name }: SignUpBody) {
  await api.post('/accounts', { email, password, name })
}
