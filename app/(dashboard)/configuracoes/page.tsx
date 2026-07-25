'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { FiSave, FiUser, FiGlobe, FiMonitor } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ConfiguracoesPage() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('pt-BR')

  useEffect(() => {
    setMounted(true)
    if (session?.user?.name) setName(session.user.name)
  }, [session])

  const handleSave = () => {
    toast.success('Preferências salvas com sucesso!')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Configurações</h1>
        <p className="text-slate-400">Personalize sua experiência no SiriusLearn.</p>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center gap-2 text-dark-text font-semibold">
          <FiUser className="text-primary-400" />
          Nome de exibição
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          placeholder="Seu nome"
        />
      </div>

      <div className="card space-y-4">
        <div className="flex items-center gap-2 text-dark-text font-semibold">
          <FiGlobe className="text-primary-400" />
          Idioma
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="input-field"
        >
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español</option>
        </select>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center gap-2 text-dark-text font-semibold">
          <FiMonitor className="text-primary-400" />
          Tema
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 py-2 rounded-xl border transition-colors ${
              mounted && theme === 'dark'
                ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                : 'border-dark-border text-slate-400'
            }`}
          >
            Escuro
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 py-2 rounded-xl border transition-colors ${
              mounted && theme === 'light'
                ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                : 'border-dark-border text-slate-400'
            }`}
          >
            Claro
          </button>
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary flex items-center gap-2">
        <FiSave />
        Salvar alterações
      </button>
    </div>
  )
}
