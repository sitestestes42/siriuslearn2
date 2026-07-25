'use client'

import { useState } from 'react'
import { FiEdit3, FiLoader } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface CorrectionResult {
  score: number
  feedback: string[]
}

export default function RedacaoPage() {
  const [essay, setEssay] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CorrectionResult | null>(null)

  const handleCorrect = async () => {
    if (essay.trim().length < 20) {
      toast.error('Escreva um texto mais completo para correção.')
      return
    }
    setLoading(true)
    setResult(null)

    // Simula chamada de correção (em produção, chamaria a Groq com um prompt
    // especializado em critérios do ENEM/vestibulares).
    await new Promise((resolve) => setTimeout(resolve, 900))

    setResult({
      score: 780,
      feedback: [
        'Boa organização de ideias entre introdução, desenvolvimento e conclusão.',
        'Utilize conectivos variados para melhorar a coesão entre parágrafos.',
        'Aprofunde a argumentação com dados ou exemplos concretos.',
        'Revise a proposta de intervenção, detalhando os agentes responsáveis.',
      ],
    })
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Correção de Redação</h1>
        <p className="text-slate-400">Cole sua redação e receba feedback estruturado.</p>
      </div>

      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Cole aqui o texto da sua redação..."
        rows={12}
        className="input-field resize-none"
      />

      <button onClick={handleCorrect} disabled={loading} className="btn-primary flex items-center gap-2">
        {loading ? <FiLoader className="animate-spin" /> : <FiEdit3 />}
        Corrigir
      </button>

      {result && (
        <div className="card space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border-4 border-primary-500 flex items-center justify-center text-lg font-bold text-dark-text">
              {result.score}
            </div>
            <div>
              <p className="font-semibold text-dark-text">Nota estimada</p>
              <p className="text-sm text-slate-400">de 1000 pontos</p>
            </div>
          </div>
          <ul className="space-y-2">
            {result.feedback.map((item) => (
              <li key={item} className="text-sm text-slate-300 flex gap-2">
                <span className="text-primary-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
