"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ListaCompras() {
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState('');

  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens() {
    const { data } = await supabase.from('lista_compras').select('*').order('id', { ascending: false });
    setItens(data || []);
  }

  async function adicionarItem(e) {
    e.preventDefault();
    if (!novoItem) return;
    await supabase.from('lista_compras').insert([{ item: novoItem, comprado: false }]);
    setNovoItem('');
    carregarItens();
  }

  async function alternarComprado(id, status) {
    await supabase.from('lista_compras').update({ comprado: !status }).eq('id', id);
    carregarItens();
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-black text-black mb-6">🛒 Lista de Compras</h2>
      
      <form onSubmit={adicionarItem} className="flex gap-2 mb-8">
        <input 
          className="flex-1 border-2 border-gray-800 p-4 rounded-xl text-black font-bold placeholder-gray-500 bg-white"
          placeholder="O que falta?"
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
        />
        <button className="bg-emerald-600 text-white px-6 rounded-xl font-black text-xl">+</button>
      </form>

      <div className="space-y-3">
        {itens.map((i) => (
          <div 
            key={i.id} 
            onClick={() => alternarComprado(i.id, i.comprado)}
            className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${
              i.comprado ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <span className={`text-lg font-black ${i.comprado ? 'text-gray-400 line-through' : 'text-black'}`}>
              {i.item}
            </span>
            <div className={`w-7 h-7 rounded-full border-2 ${i.comprado ? 'bg-emerald-500 border-emerald-600' : 'border-black'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}