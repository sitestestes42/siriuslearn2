'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-bg">
      <div className="p-8 bg-dark-card rounded-2xl border border-dark-border text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">SiriusLearn</h1>
        <button
          onClick={() => signIn('google')}
          className="px-6 py-3 bg-primary-500 rounded-xl hover:bg-primary-600 transition text-white"
        >
          Entrar com Google
        </button>
      </div>
    </div>
  )
}
