'use client'

import { useState } from 'react'
import { FiSearch, FiLoader, FiExternalLink } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface ResearchResult {
  title: string
  summary: string
  sources: string[]
}

export default function Researcher() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResearchResult | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Digite um tema para pesquisar.')
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const response = await fetch('/api/researcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      setResult(data)
    } catch {
      toast.error('Não foi possível concluir a pesquisa.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Researcher</h1>
        <p className="text-slate-400">Pesquise qualquer assunto e receba um resumo estruturado.</p>
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ex: Revolução Industrial, fotossíntese, Segunda Guerra..."
          className="input-field"
        />
        <button onClick={handleSearch} disabled={loading} className="btn-primary flex items-center gap-2 shrink-0">
          {loading ? <FiLoader className="animate-spin" /> : <FiSearch />}
          Pesquisar
        </button>
      </div>

      {result && (
        <div className="card space-y-3">
          <h2 className="font-semibold text-lg text-dark-text">{result.title}</h2>
          <p className="text-slate-300 leading-relaxed">{result.summary}</p>
          <div>
            <p className="text-xs uppercase text-slate-500 mb-2">Fontes sugeridas</p>
            <ul className="space-y-1">
              {result.sources.map((source) => (
                <li key={source} className="flex items-center gap-2 text-sm text-primary-400">
                  <FiExternalLink /> {source}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
