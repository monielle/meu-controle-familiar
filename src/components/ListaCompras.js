"use client";
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ListaCompras() {
  const [itens, setItens] = useState([])
  const [novoItem, setNovoItem] = useState('')

  const buscarItens = async () => {
    const { data } = await supabase.from('lista_compras').select('*').order('id', { ascending: false })
    if (data) setItens(data)
  }

  useEffect(() => { buscarItens() }, [])

  const adicionarItem = async (e) => {
    e.preventDefault()
    if (!novoItem) return
    await supabase.from('lista_compras').insert([{ item: novoItem, comprado: false }])
    setNovoItem('')
    buscarItens()
  }

  const alternar = async (id, status) => {
    await supabase.from('lista_compras').update({ comprado: !status }).eq('id', id)
    buscarItens()
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">🛒 Lista de Compras</h2>
      <form onSubmit={adicionarItem} className="flex gap-2 mb-4">
        <input 
          className="flex-1 border p-2 rounded" 
          value={novoItem} 
          onChange={(e) => setNovoItem(e.target.value)}
          placeholder="Ex: Leite"
        />
        <button className="bg-green-500 text-white px-4 rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {itens.map(item => (
          <li key={item.id} onClick={() => alternar(item.id, item.comprado)} className="flex items-center gap-2 cursor-pointer border-b pb-1">
            <input type="checkbox" checked={item.comprado} readOnly />
            <span className={item.comprado ? "line-through text-gray-400" : ""}>{item.item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}