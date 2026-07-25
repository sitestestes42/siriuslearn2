'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modo, setModo] = useState('smart')
  const [modoPai, setModoPai] = useState('estudo')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-bg text-white">
        Carregando...
      </div>
    )
  }

  const enviarMensagem = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          modo,
          modoPai,
        }),
      })

      if (!response.ok) throw new Error('Erro na API')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let resposta = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter((line) => line.trim())

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const json = line.substring(6)
              if (json === '[DONE]') continue
              try {
                const parsed = JSON.parse(json)
                const delta = parsed.choices?.[0]?.delta?.content || ''
                if (delta) {
                  resposta += delta
                  setMessages((prev) => {
                    const newMessages = [...prev]
                    newMessages[newMessages.length - 1].content = resposta
                    return newMessages
                  })
                }
              } catch (e) {}
            }
          }
        }
      }
    } catch (error) {
      console.error('Erro na IA:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '❌ Desculpe, ocorreu um erro. Tente novamente.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-dark-bg text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-card">
        <div>
          <h1 className="text-xl font-bold">💬 Chat SiriusLearn</h1>
          <p className="text-sm text-dark-text/60">Olá, {session?.user?.name}!</p>
        </div>
        <div className="flex gap-2">
          <select
            value={modoPai}
            onChange={(e) => setModoPai(e.target.value)}
            className="px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-sm"
          >
            <option value="estudo">📚 Estudo</option>
            <option value="cotidiano">🌍 Cotidiano</option>
          </select>
          <select
            value={modo}
            onChange={(e) => setModo(e.target.value)}
            className="px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-sm"
          >
            <option value="smart">🧠 Smart</option>
            <option value="deeper">🔬 Think Deeper</option>
            <option value="learn">📚 Estude e Aprenda</option>
            <option value="search">🌐 Pesquisar</option>
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4 animate-pulse">⭐</div>
            <h2 className="text-2xl font-bold">Olá!</h2>
            <p className="text-dark-text/60">Como posso ajudar você hoje?</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-card border border-dark-border'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-dark-card border border-dark-border px-4 py-3 rounded-2xl">
              <span className="inline-block w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
              <span className="inline-block w-2 h-2 bg-primary-400 rounded-full animate-bounce mx-1 [animation-delay:0.2s]" />
              <span className="inline-block w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-dark-border bg-dark-card">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:outline-none focus:border-primary-500"
            disabled={isLoading}
          />
          <button
            onClick={enviarMensagem}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-primary-500 rounded-xl hover:bg-primary-600 disabled:opacity-50 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
