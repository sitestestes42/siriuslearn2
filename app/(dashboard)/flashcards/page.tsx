'use client'

import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi'
import { Flashcard } from '@/types'

const sampleFlashcards: Flashcard[] = [
  { id: '1', deck: 'Biologia', front: 'O que é fotossíntese?', back: 'Processo pelo qual plantas convertem luz solar em energia química.' },
  { id: '2', deck: 'História', front: 'Quando começou a Revolução Francesa?', back: '1789' },
  { id: '3', deck: 'Matemática', front: 'Qual a fórmula de Bhaskara?', back: 'x = (-b ± √(b² - 4ac)) / 2a' },
  { id: '4', deck: 'Português', front: 'O que é um substantivo?', back: 'Palavra que nomeia seres, objetos, sentimentos ou lugares.' },
  { id: '5', deck: 'Geografia', front: 'Qual o maior bioma brasileiro?', back: 'Amazônia' },
]

export default function FlashcardsPage() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = sampleFlashcards[index]

  const next = () => {
    setFlipped(false)
    setIndex((prev) => (prev + 1) % sampleFlashcards.length)
  }

  const prev = () => {
    setFlipped(false)
    setIndex((prev) => (prev - 1 + sampleFlashcards.length) % sampleFlashcards.length)
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Flashcards</h1>
        <p className="text-slate-400">Clique no cartão para ver a resposta.</p>
      </div>

      <p className="text-xs uppercase tracking-wider text-primary-400 font-semibold">{card.deck}</p>

      <button
        onClick={() => setFlipped((prev) => !prev)}
        className="card w-full min-h-[220px] flex items-center justify-center text-center p-8 hover:border-primary-500 transition-colors"
      >
        <p className="text-lg font-medium text-dark-text">
          {flipped ? card.back : card.front}
        </p>
      </button>

      <div className="flex items-center justify-between">
        <button onClick={prev} className="p-3 rounded-xl border border-dark-border hover:bg-dark-card transition-colors">
          <FiChevronLeft className="text-dark-text" />
        </button>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <FiRefreshCw className="text-xs" />
          {index + 1} de {sampleFlashcards.length}
        </div>

        <button onClick={next} className="p-3 rounded-xl border border-dark-border hover:bg-dark-card transition-colors">
          <FiChevronRight className="text-dark-text" />
        </button>
      </div>
    </div>
  )
}
