import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { isAuthenticated } from '@/lib/auth'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated(null)) {
      router.push('/sign-in')
    }
  }, [router])

  return <h1>Hello World</h1>
}
