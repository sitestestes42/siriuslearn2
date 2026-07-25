'use client'

import { useCallback, useRef, useState } from 'react'
import { ChatMessage, ChatModeState, SubMode, ModeCategory } from '@/types'
import { SUB_MODES_BY_CATEGORY } from '@/lib/prompts'

const HISTORY_KEY = 'siriuslearn:chat-history'

function loadHistory(): ChatMessage[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    return raw ? (JSON.parse(raw) as ChatMessage[]) : []
  } catch {
    return []
  }
}

function saveHistory(messages: ChatMessage[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(messages))
  } catch {
    // localStorage indisponível (modo privado, etc.) - ignora silenciosamente
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory())
  const [isStreaming, setIsStreaming] = useState(false)
  const [mode, setMode] = useState<ChatModeState>({
    category: 'estudo',
    subMode: 'smart',
  })
  const abortRef = useRef<AbortController | null>(null)

  const setCategory = useCallback((category: ModeCategory) => {
    setMode({ category, subMode: SUB_MODES_BY_CATEGORY[category][0] })
  }, [])

  const setSubMode = useCallback((subMode: SubMode) => {
    setMode((prev) => ({ ...prev, subMode }))
  }, [])

  const clearHistory = useCallback(() => {
    setMessages([])
    saveHistory([])
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: Date.now(),
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        createdAt: Date.now(),
      }

      const nextMessages = [...messages, userMessage]
      setMessages([...nextMessages, assistantMessage])
      setIsStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch('/api/groq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
            category: mode.category,
            subMode: mode.subMode,
          }),
          signal: controller.signal,
        })

        if (!response.ok || !response.body) {
          throw new Error('Falha ao conectar com a IA')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })

          setMessages((prev) => {
            const updated = [...prev]
            const lastIndex = updated.length - 1
            updated[lastIndex] = { ...updated[lastIndex], content: accumulated }
            return updated
          })
        }

        setMessages((prev) => {
          saveHistory(prev)
          return prev
        })
      } catch (error) {
        setMessages((prev) => {
          const updated = [...prev]
          const lastIndex = updated.length - 1
          updated[lastIndex] = {
            ...updated[lastIndex],
            content:
              updated[lastIndex].content ||
              '<p>Ocorreu um erro ao falar com a IA. Verifique sua conexão e tente novamente.</p>',
          }
          saveHistory(updated)
          return updated
        })
      } finally {
        setIsStreaming(false)
        abortRef.current = null
      }
    },
    [messages, mode, isStreaming]
  )

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return {
    messages,
    isStreaming,
    mode,
    setCategory,
    setSubMode,
    sendMessage,
    stopStreaming,
    clearHistory,
  }
}
