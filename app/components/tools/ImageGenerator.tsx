'use client'

import { useState } from 'react'
import { FiImage, FiLoader } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ImageGenerator() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error('Descreva a imagem que deseja gerar.')
      return
    }
    setLoading(true)
    setImageUrl(null)
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await response.json()
      setImageUrl(data.url)
    } catch {
      toast.error('Não foi possível gerar a imagem.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Gerador de Imagens</h1>
        <p className="text-slate-400">Descreva o que você imagina e gere uma ilustração.</p>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ex: um diagrama colorido da célula animal, estilo didático"
        rows={4}
        className="input-field resize-none"
      />

      <button onClick={handleGenerate} disabled={loading} className="btn-primary flex items-center gap-2">
        {loading ? <FiLoader className="animate-spin" /> : <FiImage />}
        Gerar Imagem
      </button>

      <div className="card min-h-[240px] flex items-center justify-center">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={description} className="rounded-xl max-h-72" />
        ) : (
          <p className="text-slate-500 text-sm text-center">
            {loading ? 'Gerando sua imagem...' : 'A imagem gerada aparecerá aqui.'}
          </p>
        )}
      </div>
    </div>
  )
}
