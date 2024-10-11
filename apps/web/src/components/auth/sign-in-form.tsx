import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Button } from '../ui/button'

export function SignInForm() {
  return (
    <form className="mt-8 w-full">
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="example@example.com"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <Button>Login</Button>
    </form>
  )
}
