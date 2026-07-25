import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
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
} from 'react-icons/fi'

const tools = [
  { href: '/chat', label: 'Chat com IA', desc: 'Converse com o SiriusLearn', icon: FiMessageSquare },
  { href: '/researcher', label: 'Researcher', desc: 'Pesquise qualquer assunto', icon: FiSearch },
  { href: '/images', label: 'Imagens', desc: 'Gere imagens com IA', icon: FiImage },
  { href: '/video', label: 'Vídeo', desc: 'Resuma vídeos por URL', icon: FiVideo },
  { href: '/analysis', label: 'Análise', desc: 'Analise textos e dados', icon: FiBarChart2 },
  { href: '/audit', label: 'Auditoria', desc: 'Audite tokens e custos', icon: FiShield },
  { href: '/estudo', label: 'Estudo', desc: 'Timer de foco (Pomodoro)', icon: FiClock },
  { href: '/flashcards', label: 'Flashcards', desc: 'Revise com cartões', icon: FiLayers },
  { href: '/redacao', label: 'Redação', desc: 'Corrija sua redação', icon: FiEdit3 },
  { href: '/vestibulinho', label: 'Vestibulinho', desc: 'Simulados rápidos', icon: FiAward },
  { href: '/aulas', label: 'Aulas', desc: 'Videoaulas recomendadas', icon: FiPlayCircle },
  { href: '/grupo', label: 'Grupo de Estudos', desc: 'Estude em equipe', icon: FiUsers },
  { href: '/relatorios', label: 'Relatórios', desc: 'Acompanhe seu progresso', icon: FiPieChart },
]

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Estudante'

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-dark-text mb-1">Olá, {firstName} 👋</h1>
      <p className="text-slate-400 mb-6">O que você quer fazer hoje?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.href} href={tool.href} className="card hover:border-primary-500 transition-colors group">
              <div className="h-11 w-11 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <Icon className="text-primary-400 text-xl" />
              </div>
              <h3 className="font-semibold text-dark-text">{tool.label}</h3>
              <p className="text-sm text-slate-400 mt-1">{tool.desc}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
