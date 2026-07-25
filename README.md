# SiriusLearn 🌟

Assistente de IA para estudos e cotidiano, construído com **Next.js 14 (App Router)**, **Tailwind CSS**, **NextAuth.js**, **Supabase** e **Groq API**.

## ✨ Funcionalidades

- **Autenticação** com Google (NextAuth.js) e proteção de rotas
- **Chat com IA** (Groq, streaming) com dois modos:
  - **Estudo**: Smart, Think Deeper, Estude e Aprenda, Pesquisar
  - **Cotidiano**: Prático, Inspire-se, Explique, Liste
- **Dashboard** com atalhos para todas as ferramentas
- **Ferramentas**: Researcher, Gerador de Imagens, Resumo de Vídeo, Análise de Texto, Auditoria de Tokens
- **Estudos**: Timer Pomodoro, Flashcards, Correção de Redação, Vestibulinho, Videoaulas
- **Comunidade**: Grupos de estudo, Relatórios de progresso
- **Configurações**: nome, idioma e tema (claro/escuro)

## 🚀 Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.local.example .env.local
# preencha com suas chaves reais (Supabase, Groq, Google OAuth, NextAuth)

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## 🔑 Variáveis de ambiente necessárias

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima do Supabase |
| `GROQ_API_KEY` | Chave da API da Groq |
| `GROQ_MODEL` | Modelo usado (padrão: `llama-3.3-70b-versatile`) |
| `GROQ_API_URL` | Endpoint da Groq (padrão: `https://api.groq.com/openai/v1/chat/completions`) |
| `NEXTAUTH_SECRET` | Segredo para assinar sessões do NextAuth |
| `NEXTAUTH_URL` | URL base da aplicação |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Credenciais OAuth do Google Cloud Console |

## 📁 Estrutura de pastas

```
app/
├── (auth)/login          # Tela de login
├── (dashboard)/          # Rotas protegidas (dashboard, chat, ferramentas)
├── api/                  # Route Handlers (NextAuth, Groq, ferramentas)
├── components/
│   ├── ui/               # Sidebar, Header, Chat
│   └── tools/             # Componentes das ferramentas
├── lib/                  # auth.ts, prompts.ts, clientes Supabase
├── hooks/                # useChat
├── contexts/             # ThemeContext
├── types/                # Tipos TypeScript compartilhados
└── styles/globals.css    # Estilos globais e tema
```

## ⚠️ Notas de implementação

- As ferramentas de **Researcher**, **Imagens**, **Vídeo** e **Auditoria** usam endpoints *placeholder* que simulam respostas — substitua pela integração real (busca na web, geração de imagem, transcrição de vídeo, contagem de tokens) quando desejar.
- O chat já está **100% funcional** com a Groq API, incluindo streaming de texto e os 8 sub-modos configurados em `lib/prompts.ts`.
- Caso o alias `@/lib/...` apresente erro na sua IDE, use o caminho relativo (`../../lib/...`) como alternativa — os `paths` já estão configurados em `tsconfig.json`.
# siriuslearn2
