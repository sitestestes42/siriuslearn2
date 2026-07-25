'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

// Envolve toda a aplicação com os provedores de sessão (NextAuth) e tema (next-themes).
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0F2847',
              color: '#F0F4FF',
              border: '1px solid #1A3A6A',
            },
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  )
}
