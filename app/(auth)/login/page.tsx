'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiStar } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.replace('/chat')
    }
  }, [status, session, router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="card w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-primary-500/20 flex items-center justify-center">
            <FiStar className="text-primary-400 text-3xl animate-pulse-soft" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-dark-text">SiriusLearn</h1>
          <p className="text-slate-400 mt-1">
            Seu assistente de IA para estudos e cotidiano
          </p>
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl: '/chat' })}
          className="w-full flex items-center justify-center gap-3 bg-white text-slate-800 font-medium px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <FcGoogle className="text-xl" />
          Entrar com Google
        </button>

        <p className="text-xs text-slate-500">
          Ao entrar, você concorda com os termos de uso do SiriusLearn.
        </p>
      </div>
    </main>
  )
}
