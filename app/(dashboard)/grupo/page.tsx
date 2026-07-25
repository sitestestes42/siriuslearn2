'use client'

import { useState } from 'react'
import { FiUsers, FiPlus, FiLogIn } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function GrupoPage() {
  const [groupName, setGroupName] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  const handleCreate = () => {
    if (!groupName.trim()) {
      toast.error('Digite um nome para o grupo.')
      return
    }
    toast.success(`Grupo "${groupName}" criado! Compartilhe o código com seus colegas.`)
    setGroupName('')
  }

  const handleJoin = () => {
    if (!inviteCode.trim()) {
      toast.error('Digite o código de convite.')
      return
    }
    toast.success(`Solicitação enviada para entrar no grupo "${inviteCode}".`)
    setInviteCode('')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Grupo de Estudos</h1>
        <p className="text-slate-400">Estude em equipe: crie um grupo ou entre em um existente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card space-y-4">
          <div className="h-11 w-11 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <FiPlus className="text-primary-400 text-xl" />
          </div>
          <h2 className="font-semibold text-dark-text">Criar novo grupo</h2>
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Nome do grupo"
            className="input-field"
          />
          <button onClick={handleCreate} className="btn-primary w-full">
            Criar Grupo
          </button>
        </div>

        <div className="card space-y-4">
          <div className="h-11 w-11 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <FiLogIn className="text-primary-400 text-xl" />
          </div>
          <h2 className="font-semibold text-dark-text">Entrar em um grupo</h2>
          <input
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Código de convite"
            className="input-field"
          />
          <button onClick={handleJoin} className="btn-primary w-full">
            Entrar
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <FiUsers className="text-primary-400" />
          <h3 className="font-semibold text-dark-text">Seus grupos</h3>
        </div>
        <p className="text-sm text-slate-400">
          Você ainda não participa de nenhum grupo. Crie ou entre em um para começar a estudar em equipe.
        </p>
      </div>
    </div>
  )
}
