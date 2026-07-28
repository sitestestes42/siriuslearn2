'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/ui/Sidebar'
import Header from '@/app/components/ui/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen bg-dark-bg text-white">Carregando...</div>
  }

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-dark-bg text-dark-text">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-dark-bg">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
