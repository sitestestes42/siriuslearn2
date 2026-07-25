'use client'

import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi'

export default function Header() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evita mismatch de hidratação com next-themes
  useEffect(() => setMounted(true), [])

  const userName = session?.user?.name ?? 'Estudante'
  const userImage = session?.user?.image

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-dark-border bg-dark-bg/80 backdrop-blur px-6 py-4 lg:pl-6 pl-16">
      <div>
        <p className="text-sm text-slate-400">Bem-vindo(a) de volta,</p>
        <p className="font-semibold text-dark-text">{userName}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl border border-dark-border hover:bg-dark-card transition-colors"
          aria-label="Alternar tema"
        >
          {mounted && theme === 'dark' ? (
            <FiSun className="text-lg text-primary-400" />
          ) : (
            <FiMoon className="text-lg text-primary-400" />
          )}
        </button>

        {userImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={userImage}
            alt={userName}
            className="h-9 w-9 rounded-full border border-dark-border"
          />
        ) : (
          <div className="h-9 w-9 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="p-2 rounded-xl border border-dark-border hover:bg-dark-card transition-colors"
          aria-label="Sair"
        >
          <FiLogOut className="text-lg text-slate-400" />
        </button>
      </div>
    </header>
  )
}
