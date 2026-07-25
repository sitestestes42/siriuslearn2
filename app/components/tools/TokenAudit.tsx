'use client'

import { useState } from 'react'
import { FiShield, FiLoader, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface AuditResult {
  status: 'ok' | 'warning'
  message: string
  tokensEstimated: number
}

export default function TokenAudit() {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)

  const handleAudit = async () => {
    if (!token.trim()) {
      toast.error('Cole o token que deseja auditar.')
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'audit', token }),
      })
      const data = await response.json()
      setResult(data)
    } catch {
      toast.error('Não foi possível auditar o token.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Auditoria de Tokens</h1>
        <p className="text-slate-400">Cole um token para verificar seu uso estimado e possíveis alertas.</p>
      </div>

      <div className="flex gap-2">
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Cole o token aqui..."
          className="input-field font-mono text-sm"
        />
        <button onClick={handleAudit} disabled={loading} className="btn-primary flex items-center gap-2 shrink-0">
          {loading ? <FiLoader className="animate-spin" /> : <FiShield />}
          Auditar
        </button>
      </div>

      {result && (
        <div className="card flex items-start gap-3">
          {result.status === 'ok' ? (
            <FiCheckCircle className="text-green-400 text-xl shrink-0 mt-0.5" />
          ) : (
            <FiAlertTriangle className="text-yellow-400 text-xl shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-dark-text">{result.message}</p>
            <p className="text-sm text-slate-400 mt-1">
              Tokens estimados: <span className="font-mono">{result.tokensEstimated}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
