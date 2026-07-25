export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

export type ModeCategory = 'estudo' | 'cotidiano'

export type SubMode =
  | 'smart'
  | 'deeper'
  | 'learn'
  | 'search'
  | 'pratico'
  | 'inspire'
  | 'explique'
  | 'liste'

export interface ChatModeState {
  category: ModeCategory
  subMode: SubMode
}

export interface Flashcard {
  id: string
  front: string
  back: string
  deck: string
}

export interface AulaVideo {
  id: string
  title: string
  channel: string
  duration: string
  thumbnail: string
}

export interface VestibulinhoQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export interface ReportMetric {
  label: string
  value: string
  icon?: string
}
