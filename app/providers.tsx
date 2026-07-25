'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
        <Toaster position="top-right" />
      </ThemeProvider>
    </SessionProvider>
  )
}
