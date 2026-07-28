'use client'

import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { FiMenu, FiSun, FiMoon, FiLogOut, FiUser } from 'react-icons/fi'

export default function Header({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void }) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-dark-border bg-dark-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-dark-bg/50">
          <FiMenu className="text-xl" />
        </button>
        <h2 className="text-lg font-semibold">SiriusLearn</h2>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg hover:bg-dark-bg/50">
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <div className="flex items-center gap-2 text-sm">
          <FiUser />
          <span>{session?.user?.name || 'Usuário'}</span>
        </div>
        <button onClick={() => signOut()} className="p-2 rounded-lg hover:bg-dark-bg/50 text-red-400">
          <FiLogOut />
        </button>
      </div>
    </header>
  )
}
