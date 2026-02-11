"use client";
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Limpeza() {
  const [tarefas, setTarefas] = useState([])

  const buscar = async () => {
    const { data } = await supabase.from('tarefas_limpeza').select('*')
    if (data) setTarefas(data)
  }

  useEffect(() => { buscar() }, [])

  const concluir = async (id) => {
    await supabase.from('tarefas_limpeza').update({ ultima_execucao: new Date() }).eq('id', id)
    buscar()
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🧹 Limpeza</h2>
      <div className="space-y-3">
        {tarefas.map(t => (
          <div key={t.id} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
            <div>
              <p className="font-bold">{t.titulo}</p>
              <p className="text-xs text-gray-400">Última vez: {t.ultima_execucao ? new Date(t.ultima_execucao).toLocaleDateString() : 'Nunca'}</p>
            </div>
            <button onClick={() => concluir(t.id)} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Feito</button>
          </div>
        ))}
      </div>
    </div>
  )
}