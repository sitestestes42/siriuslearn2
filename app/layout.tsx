import './styles/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import RootLayoutClient from '@/app/components/RootLayoutClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SiriusLearn',
  description: 'Sua IA de estudos e cotidiano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  )
}
