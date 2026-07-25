'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { FiSend, FiPaperclip, FiStopCircle, FiStar } from 'react-icons/fi'
import { useChat } from '@/hooks/useChat'
import { SUB_MODES_BY_CATEGORY, SUB_MODE_LABELS } from '@/lib/prompts'
import { ModeCategory } from '@/types'

export default function Chat() {
  const { data: session } = useSession()
  const {
    messages,
    isStreaming,
    mode,
    setCategory,
    setSubMode,
    sendMessage,
    stopStreaming,
  } = useChat()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  const firstName = session?.user?.name?.split(' ')[0] ?? 'Estudante'
  const categories: ModeCategory[] = ['estudo', 'cotidiano']

  return (
    <div className="flex flex-col h-[calc(100vh-88px)]">
      {/* Slider de modos */}
      <div className="flex justify-center pt-4">
        <div className="bg-dark-card border border-dark-border rounded-2xl p-1 flex relative w-72">
          <div
            className="absolute top-1 bottom-1 w-1/2 rounded-xl bg-primary-500 transition-transform duration-200"
            style={{
              transform: mode.category === 'estudo' ? 'translateX(0%)' : 'translateX(100%)',
            }}
          />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-xl transition-colors capitalize ${
                mode.category === cat ? 'text-white' : 'text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-modos */}
      <div className="flex justify-center gap-2 flex-wrap px-4 pt-3">
        {SUB_MODES_BY_CATEGORY[mode.category].map((sub) => (
          <button
            key={sub}
            onClick={() => setSubMode(sub)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              mode.subMode === sub
                ? 'bg-primary-500/20 border-primary-500 text-primary-400'
                : 'border-dark-border text-slate-400 hover:text-dark-text'
            }`}
          >
            {SUB_MODE_LABELS[sub]}
          </button>
        ))}
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary-500/20 flex items-center justify-center">
              <FiStar className="text-primary-400 text-3xl animate-pulse-soft" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark-text">Olá, {firstName}!</h2>
              <p className="text-slate-400 mt-1">
                No que posso te ajudar hoje no modo {mode.category}?
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'card !p-4'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div
                      className="prose-sm max-w-none [&_h4]:font-bold [&_h4]:mb-1 [&_h5]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:font-bold"
                      dangerouslySetInnerHTML={{
                        __html: message.content || '<em>Pensando...</em>',
                      }}
                    />
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-4 pb-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2 bg-dark-card border border-dark-border rounded-2xl px-3 py-2">
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-primary-400 transition-colors"
            aria-label="Anexar arquivo"
            title="Upload de arquivos (em breve)"
          >
            <FiPaperclip className="text-lg" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-transparent outline-none text-dark-text placeholder:text-slate-500 py-2"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stopStreaming}
              className="p-2 text-red-400 hover:text-red-300 transition-colors"
              aria-label="Parar geração"
            >
              <FiStopCircle className="text-xl" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 text-primary-400 hover:text-primary-300 disabled:opacity-40 transition-colors"
              aria-label="Enviar mensagem"
            >
              <FiSend className="text-xl" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
