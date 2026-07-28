'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Sidebar from '@/app/components/ui/Sidebar'
import Header from '@/app/components/ui/Header'

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const isLoginPage = pathname === '/login'
  const showSidebar = !isLoginPage && status === 'authenticated'

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen bg-dark-bg text-white">Carregando...</div>
  }

  if (!showSidebar) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-dark-bg text-dark-text">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-dark-bg">
          {children}
        </main>
      </div>
    </div>
  )
}
