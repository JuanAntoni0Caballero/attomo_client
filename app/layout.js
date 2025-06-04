'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navigation from './components/Navigation/Navigation'
import Loading from './loading'
import { AuthProvider } from './contexts/auth.context'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'globals.css'

const DynamicChildren = dynamic(() => Promise.resolve(({ children }) => <>{children}</>), {
  ssr: false,
  loading: () => <Loading />
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <header>
            <title>Game Score Hub</title>
          </header>
          <Navigation />
          <Suspense fallback={<Loading />}>
            <DynamicChildren>{children}</DynamicChildren>
          </Suspense>
        </body>
      </AuthProvider>
    </html>
  );
}
