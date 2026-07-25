import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ChatPage() {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-bg text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">💬 Chat</h1>
        <p className="text-dark-text/60">Bem-vindo, {session.user?.name}!</p>
        <p className="text-dark-text/40 mt-2">Em breve: chat com IA</p>
      </div>
    </div>
  )
}
