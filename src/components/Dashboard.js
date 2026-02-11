"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [estatisticas, setEstatisticas] = useState({
    compras: 0,
    tarefas: 0,
    pratoHoje: 'Carregando...'
  });

  useEffect(() => {
    async function carregarDados() {
      const hoje = new Date().getDay(); // 0 = Domingo, 1 = Segunda...

      // 1. Busca total de itens não comprados
      const { count: countCompras } = await supabase
        .from('lista_compras')
        .select('*', { count: 'exact', head: true })
        .eq('comprado', false);

      // 2. Busca total de tarefas de limpeza cadastradas
      const { count: countLimpeza } = await supabase
        .from('tarefas_limpeza')
        .select('*', { count: 'exact', head: true });

      // 3. Busca o prato do dia no cardápio
      const { data: cardapio } = await supabase
        .from('cardapio')
        .select('prato_nome')
        .eq('dia_semana', hoje)
        .single();

      setEstatisticas({
        compras: countCompras || 0,
        tarefas: countLimpeza || 0,
        pratoHoje: cardapio?.prato_nome || 'Não definido'
      });
    }

    carregarDados();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Painel da Casa 🏠
        </h1>
        <p className="text-gray-500">Resumo das atividades familiares para hoje.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Cardápio */}
        <div className="bg-orange-500 p-6 rounded-3xl shadow-lg shadow-orange-200 text-white">
          <p className="text-orange-100 font-bold uppercase text-xs tracking-wider mb-2">Hoje tem:</p>
          <p className="text-2xl font-bold">{estatisticas.pratoHoje}</p>
          <p className="text-sm mt-4 opacity-80">🍴 Almoço Planejado</p>
        </div>

        {/* Card Compras */}
        <div className="bg-emerald-500 p-6 rounded-3xl shadow-lg shadow-emerald-200 text-white">
          <p className="text-emerald-100 font-bold uppercase text-xs tracking-wider mb-2">Faltam comprar:</p>
          <p className="text-4xl font-black">{estatisticas.compras}</p>
          <p className="text-sm mt-4 opacity-80 text-white">🛒 Itens na lista</p>
        </div>

        {/* Card Limpeza */}
        <div className="bg-blue-600 p-6 rounded-3xl shadow-lg shadow-blue-200 text-white">
          <p className="text-blue-100 font-bold uppercase text-xs tracking-wider mb-2">Rotinas Ativas:</p>
          <p className="text-4xl font-black">{estatisticas.tarefas}</p>
          <p className="text-sm mt-4 opacity-80">🧹 Limpeza registrada</p>
        </div>
      </div>

      <div className="mt-10 p-6 bg-white border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-400 italic">
        "Onde há ordem, há paz." — Use o menu acima para atualizar os dados.
      </div>
    </div>
  );
}