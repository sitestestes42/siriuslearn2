'use client'

import { useEffect, useRef, useState } from 'react'
import { FiPlay, FiPause, FiRotateCcw, FiClock } from 'react-icons/fi'

const FOCUS_MINUTES = 25
const TOTAL_SECONDS = FOCUS_MINUTES * 60

export default function EstudoPage() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const progress = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100

  const reset = () => {
    setIsRunning(false)
    setSecondsLeft(TOTAL_SECONDS)
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Sessão de Estudo</h1>
        <p className="text-slate-400">Use a técnica Pomodoro para manter o foco.</p>
      </div>

      <div className="card flex flex-col items-center gap-6 py-10">
        <div className="h-14 w-14 rounded-2xl bg-primary-500/20 flex items-center justify-center">
          <FiClock className="text-primary-400 text-2xl" />
        </div>

        <div className="text-6xl font-mono font-bold text-dark-text">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex gap-3">
          <button onClick={() => setIsRunning((prev) => !prev)} className="btn-primary flex items-center gap-2">
            {isRunning ? <FiPause /> : <FiPlay />}
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dark-border text-slate-300 hover:bg-dark-bg transition-colors"
          >
            <FiRotateCcw />
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}
