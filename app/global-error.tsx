'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Global error:', error)
    console.error('Digest:', error.digest)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-dark-bg text-white p-4">
          <div className="text-center max-w-2xl">
            <h1 className="text-3xl font-bold text-red-500 mb-4">⚠️ Erro no Servidor</h1>
            <p className="text-dark-text/60 mb-2">Ocorreu um erro inesperado.</p>
            <p className="text-dark-text/40 text-sm mb-4">Digest: {error.digest || 'N/A'}</p>
            <pre className="bg-dark-card p-4 rounded-xl text-left text-sm overflow-auto max-h-60 text-dark-text/80 border border-dark-border">
              {error.message || 'Mensagem de erro não disponível'}
            </pre>
            <button
              onClick={reset}
              className="mt-4 px-6 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
