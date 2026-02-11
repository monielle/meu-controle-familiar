"use client";
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

export default function Cardapio() {
  const [pratos, setPratos] = useState([])

  const buscar = async () => {
    const { data } = await supabase.from('cardapio').select('*')
    if (data) setPratos(data)
  }

  useEffect(() => { buscar() }, [])

  const salvar = async (dia, nome) => {
    await supabase.from('cardapio').upsert({ dia_semana: dia, prato_nome: nome, tipo_refeicao: 'almoco' }, { onConflict: 'dia_semana, tipo_refeicao' })
    buscar()
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🍽️ Cardápio Semanal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DIAS.map((nomeDia, index) => {
          const p = pratos.find(item => item.dia_semana === index)
          return (
            <div key={index} className="p-4 bg-white border rounded-lg shadow-sm">
              <span className="font-bold text-blue-500 text-sm uppercase">{nomeDia}</span>
              <input 
                className="w-full mt-1 border-b outline-none focus:border-blue-400"
                defaultValue={p?.prato_nome || ''}
                onBlur={(e) => salvar(index, e.target.value)}
                placeholder="O que vamos comer?"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}