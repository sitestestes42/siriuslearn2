import { FiPlayCircle, FiClock } from 'react-icons/fi'
import { AulaVideo } from '@/types'

const aulas: AulaVideo[] = [
  { id: '1', title: 'Introdução à Física Mecânica', channel: 'Descomplica', duration: '18:32', thumbnail: 'https://placehold.co/320x180/0F2847/1E90FF?text=F%C3%ADsica' },
  { id: '2', title: 'Figuras de Linguagem - Português', channel: 'Curso Enem Gratuito', duration: '22:10', thumbnail: 'https://placehold.co/320x180/0F2847/1E90FF?text=Portugu%C3%AAs' },
  { id: '3', title: 'Equações do 2º grau', channel: 'Matemática Rio', duration: '15:47', thumbnail: 'https://placehold.co/320x180/0F2847/1E90FF?text=Matem%C3%A1tica' },
  { id: '4', title: 'Revolução Francesa - Resumo', channel: 'História com Foco', duration: '20:05', thumbnail: 'https://placehold.co/320x180/0F2847/1E90FF?text=Hist%C3%B3ria' },
  { id: '5', title: 'Ligações Químicas', channel: 'Química em Foco', duration: '17:59', thumbnail: 'https://placehold.co/320x180/0F2847/1E90FF?text=Qu%C3%ADmica' },
  { id: '6', title: 'Ecossistemas e Biomas', channel: 'Biologia Total', duration: '19:14', thumbnail: 'https://placehold.co/320x180/0F2847/1E90FF?text=Biologia' },
]

export default function AulasPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Aulas Recomendadas</h1>
        <p className="text-slate-400">Videoaulas selecionadas para reforçar seus estudos.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {aulas.map((aula) => (
          <div key={aula.id} className="card !p-0 overflow-hidden group cursor-pointer">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={aula.thumbnail} alt={aula.title} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FiPlayCircle className="text-white text-4xl" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-dark-text line-clamp-2">{aula.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{aula.channel}</p>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                <FiClock />
                {aula.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
