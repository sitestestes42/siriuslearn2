'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  FiMessageSquare,
  FiSearch,
  FiImage,
  FiVideo,
  FiBarChart2,
  FiShield,
  FiClock,
  FiLayers,
  FiEdit3,
  FiAward,
  FiUsers,
  FiPlayCircle,
  FiPieChart,
  FiSettings,
  FiMenu,
  FiX,
  FiStar,
} from 'react-icons/fi'

const menuGroups = [
  {
    title: 'Principal',
    items: [{ href: '/chat', label: 'Chat', icon: FiMessageSquare }],
  },
  {
    title: 'Ferramentas',
    items: [
      { href: '/researcher', label: 'Researcher', icon: FiSearch },
      { href: '/images', label: 'Imagens', icon: FiImage },
      { href: '/video', label: 'Vídeo', icon: FiVideo },
      { href: '/analysis', label: 'Análise', icon: FiBarChart2 },
      { href: '/audit', label: 'Auditoria', icon: FiShield },
    ],
  },
  {
    title: 'Estudos',
    items: [
      { href: '/estudo', label: 'Estudo', icon: FiClock },
      { href: '/flashcards', label: 'Flashcards', icon: FiLayers },
      { href: '/redacao', label: 'Redação', icon: FiEdit3 },
      { href: '/vestibulinho', label: 'Vestibulinho', icon: FiAward },
      { href: '/aulas', label: 'Aulas', icon: FiPlayCircle },
    ],
  },
  {
    title: 'Comunidade',
    items: [
      { href: '/grupo', label: 'Grupo', icon: FiUsers },
      { href: '/relatorios', label: 'Relatórios', icon: FiPieChart },
    ],
  },
  {
    title: 'Sistema',
    items: [{ href: '/configuracoes', label: 'Configurações', icon: FiSettings }],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Botão hambúrguer (mobile) */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-dark-card border border-dark-border p-2 rounded-xl"
        aria-label="Abrir menu"
      >
        <FiMenu className="text-dark-text text-xl" />
      </button>

      {/* Overlay mobile */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-72 bg-dark-card border-r border-dark-border z-50 transform transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 flex flex-col`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary-500/20 flex items-center justify-center">
              <FiStar className="text-primary-400" />
            </div>
            <span className="font-bold text-dark-text text-lg">SiriusLearn</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-slate-400 hover:text-dark-text"
            aria-label="Fechar menu"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-500/20 text-primary-400'
                          : 'text-slate-400 hover:bg-dark-bg hover:text-dark-text'
                      }`}
                    >
                      <Icon className="text-lg shrink-0" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
