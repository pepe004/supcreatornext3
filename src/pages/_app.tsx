import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppwriteProvider } from '@/lib/appwrite'
import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/Layout'
import '@/lib/i18n'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppwriteProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </AppwriteProvider>
  )
}