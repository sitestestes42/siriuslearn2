'use client'

import { useState } from 'react'
import { FiBarChart2, FiLoader } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface AnalysisResult {
  wordCount: number
  readingTimeMinutes: number
  summary: string
}

export default function AnalysisPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Cole um texto para analisar.')
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      setResult(data)
    } catch {
      toast.error('Não foi possível analisar o texto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Análise de Texto</h1>
        <p className="text-slate-400">Cole um texto para receber métricas e um resumo analítico.</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Cole aqui o texto que deseja analisar..."
        rows={8}
        className="input-field resize-none"
      />

      <button onClick={handleAnalyze} disabled={loading} className="btn-primary flex items-center gap-2">
        {loading ? <FiLoader className="animate-spin" /> : <FiBarChart2 />}
        Analisar
      </button>

      {result && (
        <div className="card space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase text-slate-500">Palavras</p>
              <p className="text-xl font-bold text-dark-text">{result.wordCount}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">Tempo de leitura</p>
              <p className="text-xl font-bold text-dark-text">{result.readingTimeMinutes} min</p>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed">{result.summary}</p>
        </div>
      )}
    </div>
  )
}
