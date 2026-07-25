import { NextRequest, NextResponse } from 'next/server'

// Endpoint placeholder: em produção, integraria com uma API de geração
// de imagens (ex: DALL-E, Stable Diffusion, Flux via Groq/Together etc.)
export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json()

    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'Descrição inválida' }, { status: 400 })
    }

    await new Promise((resolve) => setTimeout(resolve, 800))

    // Placeholder visual gerado dinamicamente com o texto da descrição
    const encoded = encodeURIComponent(description.slice(0, 40))
    return NextResponse.json({
      url: `https://placehold.co/512x512/0F2847/1E90FF?text=${encoded}`,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao gerar imagem' }, { status: 500 })
  }
}
