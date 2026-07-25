import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function HomePage() {
  // Tenta pegar a sessão diretamente
  try {
    const session = await getServerSession()
    if (session) {
      redirect('/login')
    } else {
      redirect('/login')
    }
  } catch (error) {
    redirect('/login')
  }
}
