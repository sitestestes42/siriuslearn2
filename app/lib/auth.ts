import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Configuração central do NextAuth. Usada pela rota de API e por getServerSession
// em Server Components para checar a sessão do usuário.
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { id?: string }).id = token.sub
      }
      return session
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.picture = (profile as { picture?: string }).picture
      }
      return token
    },
  },
}
