import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function HomePage() {
  try {
    const session = await auth()
    if (session) {
      redirect('/chat')
    } else {
      redirect('/login')
    }
  } catch (error) {
    console.error('Erro na página inicial:', error)
    redirect('/login')
  }
}
