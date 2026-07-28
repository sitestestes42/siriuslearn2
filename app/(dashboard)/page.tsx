'use client'

import { useSession } from 'next-auth/react'
import { FiMessageSquare, FiBook, FiClock, FiEdit, FiTrendingUp, FiUsers, FiYoutube, FiBarChart2, FiSettings } from 'react-icons/fi'
import Link from 'next/link'

const tools = [
  { name: 'Chat', icon: FiMessageSquare, href: '/chat', color: 'text-primary-500' },
  { name: 'Flashcards', icon: FiBook, href: '/flashcards', color: 'text-yellow-500' },
  { name: 'Estudo', icon: FiClock, href: '/estudo', color: 'text-green-500' },
  { name: 'Redação', icon: FiEdit, href: '/redacao', color: 'text-purple-500' },
  { name: 'Vestibulinho', icon: FiTrendingUp, href: '/vestibulinho', color: 'text-blue-400' },
  { name: 'Grupos', icon: FiUsers, href: '/grupo', color: 'text-pink-500' },
  { name: 'Aulas', icon: FiYoutube, href: '/aulas', color: 'text-red-500' },
  { name: 'Relatórios', icon: FiBarChart2, href: '/relatorios', color: 'text-cyan-500' },
  { name: 'Configurações', icon: FiSettings, href: '/configuracoes', color: 'text-gray-400' },
]

export default function Dashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Olá, {session?.user?.name || 'Usuário'}! 👋</h1>
        <p className="text-dark-text/60">Bem-vindo ao SiriusLearn. O que você quer fazer hoje?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="p-6 bg-dark-card rounded-2xl border border-dark-border hover:border-primary-500/50 transition-all group"
          >
            <tool.icon className={`text-3xl ${tool.color} mb-3`} />
            <h3 className="text-lg font-semibold group-hover:text-primary-400">{tool.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
