import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${nunitoSans.variable}font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
