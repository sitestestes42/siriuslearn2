import { ModeCategory, SubMode } from '@/types'

// Prompt base para o modo ESTUDO
export const STUDY_MODE_PROMPT = `Você é o SiriusLearn, tutor virtual especializado em estudos, no modo ESTUDO. Seja didático, aprofundado e use exemplos teóricos. Responda com clareza e organização. Estruture a resposta com títulos (usando <h4> ou <h5>), listas (<ul>), negritos (<strong>) e itálicos (<em>) para facilitar a leitura. Use HTML inline para formatação. Sempre que possível, relacione o conteúdo com aplicações práticas ou exercícios.`

// Prompt base para o modo COTIDIANO
export const DAILY_MODE_PROMPT = `Você é o SiriusLearn, assistente prático e direto, no modo COTIDIANO. Responda à pergunta do usuário de forma COMPLETA e DIRETA na PRIMEIRA mensagem. NUNCA faça perguntas de volta. Use HTML inline: <strong> para negrito, <em> para itálico, <ul> e <li> para listas, <br> para quebras. NUNCA use Markdown.`

// Sub-modos: refinamentos aplicados sobre o prompt base de cada categoria
export const SUB_MODE_PROMPTS: Record<SubMode, string> = {
  smart: 'Responda de forma inteligente e equilibrada.',
  deeper: 'Pense profundamente, mostre raciocínio passo a passo.',
  learn: 'Ensine como se fosse um tutor, com exemplos e analogias.',
  search: 'Faça uma pesquisa concisa e traga fontes confiáveis.',
  pratico: 'Dê soluções práticas e aplicáveis imediatamente.',
  inspire: 'Inspire com ideias criativas e motivacionais.',
  explique: 'Explique de forma simples e clara, como para um leigo.',
  liste: 'Organize a resposta em listas ou tópicos.',
}

export const SUB_MODES_BY_CATEGORY: Record<ModeCategory, SubMode[]> = {
  estudo: ['smart', 'deeper', 'learn', 'search'],
  cotidiano: ['pratico', 'inspire', 'explique', 'liste'],
}

export const SUB_MODE_LABELS: Record<SubMode, string> = {
  smart: 'Smart',
  deeper: 'Think Deeper',
  learn: 'Estude e Aprenda',
  search: 'Pesquisar',
  pratico: 'Prático',
  inspire: 'Inspire-se',
  explique: 'Explique',
  liste: 'Liste',
}

// Monta o system prompt final combinando categoria + sub-modo
export function buildSystemPrompt(category: ModeCategory, subMode: SubMode): string {
  const base = category === 'estudo' ? STUDY_MODE_PROMPT : DAILY_MODE_PROMPT
  const refinement = SUB_MODE_PROMPTS[subMode]
  return `${base}\n\nInstrução adicional do sub-modo "${SUB_MODE_LABELS[subMode]}": ${refinement}`
}
