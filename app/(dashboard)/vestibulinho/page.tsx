'use client'

import { useState } from 'react'
import { FiAward, FiCheck, FiX } from 'react-icons/fi'
import { VestibulinhoQuestion } from '@/types'

const questionBank: VestibulinhoQuestion[] = [
  {
    id: 'q1',
    question: 'Qual é o resultado de 7 x 8?',
    options: ['54', '56', '58', '64'],
    correctIndex: 1,
  },
  {
    id: 'q2',
    question: 'Quem escreveu "Dom Casmurro"?',
    options: ['José de Alencar', 'Machado de Assis', 'Clarice Lispector', 'Guimarães Rosa'],
    correctIndex: 1,
  },
  {
    id: 'q3',
    question: 'Qual planeta é conhecido como o "Planeta Vermelho"?',
    options: ['Vênus', 'Júpiter', 'Marte', 'Saturno'],
    correctIndex: 2,
  },
]

export default function VestibulinhoPage() {
  const [questions, setQuestions] = useState<VestibulinhoQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const generateSimulado = () => {
    // Embaralha o banco de questões (simulação de geração de simulado)
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
    setAnswers({})
    setSubmitted(false)
  }

  const selectAnswer = (questionId: string, optionIndex: number) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-dark-text">Vestibulinho</h1>
          <p className="text-slate-400">Gere um simulado rápido para treinar.</p>
        </div>
        <button onClick={generateSimulado} className="btn-primary flex items-center gap-2">
          <FiAward />
          Gerar Simulado
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="card text-center text-slate-400 py-10">
          Clique em &quot;Gerar Simulado&quot; para começar.
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, qIndex) => (
            <div key={q.id} className="card space-y-3">
              <p className="font-medium text-dark-text">
                {qIndex + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, optIndex) => {
                  const isSelected = answers[q.id] === optIndex
                  const isCorrect = submitted && optIndex === q.correctIndex
                  const isWrong = submitted && isSelected && optIndex !== q.correctIndex
                  return (
                    <button
                      key={option}
                      onClick={() => selectAnswer(q.id, optIndex)}
                      className={`w-full flex items-center justify-between text-left px-4 py-2.5 rounded-xl border transition-colors ${
                        isCorrect
                          ? 'border-green-500 bg-green-500/10 text-green-400'
                          : isWrong
                          ? 'border-red-500 bg-red-500/10 text-red-400'
                          : isSelected
                          ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                          : 'border-dark-border text-slate-300 hover:bg-dark-bg'
                      }`}
                    >
                      {option}
                      {isCorrect && <FiCheck />}
                      {isWrong && <FiX />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < questions.length}
              className="btn-primary w-full"
            >
              Corrigir Simulado
            </button>
          ) : (
            <div className="card text-center">
              <p className="text-lg font-semibold text-dark-text">
                Você acertou {score} de {questions.length} questões!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
