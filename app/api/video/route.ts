import { NextRequest, NextResponse } from 'next/server'

// Endpoint placeholder: em produção, integraria com uma API de transcrição
// (ex: YouTube Transcript API) + a Groq para gerar o resumo do conteúdo.
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL inválida' }, { status: 400 })
    }

    await new Promise((resolve) => setTimeout(resolve, 700))

    return NextResponse.json({
      summary: `Resumo simulado do vídeo em "${url}". Em produção, este texto seria gerado a partir da transcrição real do vídeo, destacando os principais tópicos, momentos-chave e conclusões apresentadas pelo autor.`,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao resumir vídeo' }, { status: 500 })
  }
}
