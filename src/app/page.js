"use client";
import { useState } from 'react'
import Dashboard from '../components/Dashboard'
import Cardapio from '../components/Cardapio'
import ListaCompras from '../components/ListaCompras'
import Limpeza from '../components/Limpeza'

export default function Home() {
  const [aba, setAba] = useState('inicio')

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Menu Superior */}
      <nav className="bg-white shadow-sm sticky top-0 z-20 p-4 mb-6">
        <div className="max-w-4xl mx-auto flex justify-between font-bold text-gray-500 text-xs sm:text-sm">
          <button onClick={() => setAba('inicio')} className={aba === 'inicio' ? "text-blue-600 border-b-2 border-blue-600" : ""}>INÍCIO</button>
          <button onClick={() => setAba('cardapio')} className={aba === 'cardapio' ? "text-blue-600 border-b-2 border-blue-600" : ""}>CARDÁPIO</button>
          <button onClick={() => setAba('limpeza')} className={aba === 'limpeza' ? "text-blue-600 border-b-2 border-blue-600" : ""}>LIMPEZA</button>
          <button onClick={() => setAba('compras')} className={aba === 'compras' ? "text-blue-600 border-b-2 border-blue-600" : ""}>COMPRAS</button>
        </div>
      </nav>

      {/* Conteúdo das Abas */}
      <div className="animate-in fade-in duration-500">
        {aba === 'inicio' && <Dashboard />}
        {aba === 'cardapio' && <Cardapio />}
        {aba === 'limpeza' && <Limpeza />}
        {aba === 'compras' && <ListaCompras />}
      </div>
    </main>
  )
}