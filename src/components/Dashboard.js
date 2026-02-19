"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [stats, setStats] = useState({ compras: 0, tarefas: 0, prato: '...' });

  useEffect(() => {
    async function carregar() {
      const { count: c } = await supabase.from('lista_compras').select('*', { count: 'exact', head: true }).eq('comprado', false);
      const { count: t } = await supabase.from('tarefas_limpeza').select('*', { count: 'exact', head: true });
      const { data: p } = await supabase.from('cardapio').select('prato_nome').eq('dia_semana', new Date().getDay()).single();
      setStats({ compras: c || 0, tarefas: t || 0, prato: p?.prato_nome || 'Livre' });
    }
    carregar();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-black text-black tracking-tight">Casa Amaral 🏠</h1>
        <p className="text-gray-800 font-bold uppercase text-xs tracking-widest mt-1">Resumo de Hoje</p>
      </header>

      <div className="bg-orange-500 p-6 rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-orange-100 font-black text-xs uppercase mb-1">Hoje comeremos:</p>
        <p className="text-white text-2xl font-black leading-tight">{stats.prato}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-500 p-5 rounded-[2rem] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-4xl font-black text-white">{stats.compras}</p>
          <p className="text-white font-black text-xs uppercase">Compras</p>
        </div>
        <div className="bg-blue-600 p-5 rounded-[2rem] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-4xl font-black text-white">{stats.tarefas}</p>
          <p className="text-white font-black text-xs uppercase">Rotinas</p>
        </div>
      </div>
    </div>
  );
}