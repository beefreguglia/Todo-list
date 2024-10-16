import '@/styles/globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Nunito_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import { queryClient } from '@/lib/react-query'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${nunitoSans.variable}font-sans`}>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-right" />
        <Component {...pageProps} />
      </QueryClientProvider>
    </main>
  )
}
