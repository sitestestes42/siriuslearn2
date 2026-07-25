import type { Metadata } from 'next'
import './styles/globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'SiriusLearn - Assistente de Estudos com IA',
  description: 'Seu assistente de IA para estudos e cotidiano.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
