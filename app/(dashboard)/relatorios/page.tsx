import { FiClock, FiLayers, FiTarget, FiTrendingUp } from 'react-icons/fi'

const metrics = [
  { label: 'Minutos estudados', value: '1.240', icon: FiClock },
  { label: 'Sessões concluídas', value: '38', icon: FiTarget },
  { label: 'Flashcards revisados', value: '512', icon: FiLayers },
  { label: 'Progresso semanal', value: '+18%', icon: FiTrendingUp },
]

const weeklyData = [
  { day: 'Seg', minutes: 45 },
  { day: 'Ter', minutes: 60 },
  { day: 'Qua', minutes: 30 },
  { day: 'Qui', minutes: 80 },
  { day: 'Sex', minutes: 50 },
  { day: 'Sáb', minutes: 20 },
  { day: 'Dom', minutes: 10 },
]

const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes))

export default function RelatoriosPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Relatórios</h1>
        <p className="text-slate-400">Acompanhe seu progresso e hábitos de estudo.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.label} className="card">
              <Icon className="text-primary-400 text-xl mb-3" />
              <p className="text-2xl font-bold text-dark-text">{metric.value}</p>
              <p className="text-sm text-slate-400">{metric.label}</p>
            </div>
          )
        })}
      </div>

      <div className="card">
        <h2 className="font-semibold text-dark-text mb-6">Minutos estudados na semana</h2>
        <div className="flex items-end justify-between gap-3 h-40">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-primary-500 rounded-t-lg transition-all"
                style={{ height: `${(d.minutes / maxMinutes) * 100}%` }}
              />
              <span className="text-xs text-slate-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
