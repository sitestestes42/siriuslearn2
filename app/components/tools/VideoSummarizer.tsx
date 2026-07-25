'use client'

import { useState } from 'react'
import { FiVideo, FiLoader } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function VideoSummarizer() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)

  const handleSummarize = async () => {
    if (!url.trim()) {
      toast.error('Cole a URL do vídeo.')
      return
    }
    setLoading(true)
    setSummary(null)
    try {
      const response = await fetch('/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      setSummary(data.summary)
    } catch {
      toast.error('Não foi possível resumir o vídeo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Resumo de Vídeo</h1>
        <p className="text-slate-400">Cole a URL de um vídeo para receber um resumo dos pontos principais.</p>
      </div>

      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="input-field"
        />
        <button onClick={handleSummarize} disabled={loading} className="btn-primary flex items-center gap-2 shrink-0">
          {loading ? <FiLoader className="animate-spin" /> : <FiVideo />}
          Resumir
        </button>
      </div>

      {summary && (
        <div className="card">
          <p className="text-slate-300 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  )
}
