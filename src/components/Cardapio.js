"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Cardapio() {
  const [pratos, setPratos] = useState([]);
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  useEffect(() => {
    carregarCardapio();
  }, []);

  async function carregarCardapio() {
    const { data } = await supabase.from('cardapio').select('*').order('dia_semana', { ascending: true });
    setPratos(data || []);
  }

  async function atualizarPrato(dia, nome) {
    const { error } = await supabase.from('cardapio').upsert({ dia_semana: dia, prato_nome: nome }, { onConflict: 'dia_semana' });
    if (!error) carregarCardapio();
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-black text-black mb-6">🍴 Planejamento de Refeições</h2>
      <div className="space-y-4">
        {dias.map((dia, index) => {
          const pratoDoDia = pratos.find(p => p.dia_semana === index);
          return (
            <div key={dia} className="bg-white border-4 border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <label className="block text-xs font-black uppercase text-orange-600 mb-1">{dia}</label>
              <input 
                className="w-full text-lg font-black text-black outline-none placeholder-gray-400"
                placeholder="O que vamos comer?"
                defaultValue={pratoDoDia?.prato_nome || ''}
                onBlur={(e) => atualizarPrato(index, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}