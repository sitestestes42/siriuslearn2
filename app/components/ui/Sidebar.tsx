'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiHome, FiMessageSquare, FiBook, FiClock, FiEdit, 
  FiTrendingUp, FiUsers, FiYoutube, FiBarChart2, FiSettings, FiStar
} from 'react-icons/fi'

const menuItems = [
  { name: 'Dashboard', icon: FiHome, href: '/' },
  { name: 'Chat', icon: FiMessageSquare, href: '/chat' },
  { name: 'Flashcards', icon: FiBook, href: '/flashcards' },
  { name: 'Estudo', icon: FiClock, href: '/estudo' },
  { name: 'Redação', icon: FiEdit, href: '/redacao' },
  { name: 'Vestibulinho', icon: FiTrendingUp, href: '/vestibulinho' },
  { name: 'Grupos', icon: FiUsers, href: '/grupo' },
  { name: 'Aulas', icon: FiYoutube, href: '/aulas' },
  { name: 'Relatórios', icon: FiBarChart2, href: '/relatorios' },
  { name: 'Configurações', icon: FiSettings, href: '/configuracoes' },
]

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = usePathname()

  return (
    <>
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-dark-card border-r border-dark-border
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center gap-2 p-4 border-b border-dark-border">
          <FiStar className="text-primary-500 text-2xl" />
          <h1 className="text-xl font-bold">Sirius<span className="text-primary-500">Learn</span></h1>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href + '/') && item.href !== '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-primary-500/10 text-primary-400' 
                    : 'text-dark-text/70 hover:bg-dark-bg/50 hover:text-dark-text'
                  }
                `}
              >
                <item.icon className="text-lg" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
