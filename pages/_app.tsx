import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from "next/font/google"
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider session={ pageProps.session }>
    <RecoilRoot>
      <Layout>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </RecoilRoot>
  </SessionProvider>

  
  );
}
