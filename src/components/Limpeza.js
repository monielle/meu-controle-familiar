"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Limpeza() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    const { data } = await supabase.from('tarefas_limpeza').select('*').order('id', { ascending: false });
    setTarefas(data || []);
  }

  async function adicionar(e) {
    e.preventDefault();
    if (!novaTarefa) return;
    await supabase.from('tarefas_limpeza').insert([{ nome: novaTarefa }]);
    setNovaTarefa('');
    carregarTarefas();
  }

  async function excluir(id) {
    await supabase.from('tarefas_limpeza').delete().eq('id', id);
    carregarTarefas();
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-black text-black mb-6">🧹 Rotina de Limpeza</h2>
      
      <form onSubmit={adicionar} className="flex gap-2 mb-8">
        <input 
          className="flex-1 border-4 border-black p-4 rounded-2xl text-black font-black placeholder-gray-500 bg-white"
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 rounded-2xl font-black text-2xl border-4 border-black">+</button>
      </form>

      <div className="space-y-4">
        {tarefas.map((t) => (
          <div key={t.id} className="bg-white border-4 border-black p-5 rounded-2xl flex justify-between items-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-lg font-black text-black">{t.nome}</span>
            <button 
              onClick={() => excluir(t.id)}
              className="bg-red-100 text-red-600 font-black px-3 py-1 rounded-lg border-2 border-red-600 text-xs uppercase"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}