"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Cardapio() {
  const [pratos, setPratos] = useState([]);
  const [salvando, setSalvando] = useState(null); // Para mostrar um feedback visual
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  useEffect(() => {
    carregarCardapio();
  }, []);

  async function carregarCardapio() {
    const { data } = await supabase.from('cardapio').select('*').order('dia_semana', { ascending: true });
    setPratos(data || []);
  }

  async function salvarNoBanco(diaIndice, nomePrato) {
    if (!nomePrato) return; // Não salva se estiver vazio
    
    setSalvando(diaIndice);
    
    const { error } = await supabase
      .from('cardapio')
      .upsert(
        { dia_semana: diaIndice, prato_nome: nomePrato }, 
        { onConflict: 'dia_semana' } // Aqui ele diz: "Se o dia_semana já existir, só mude o nome"
      );
    
    if (error) {
      console.error("Erro detalhes:", error);
      alert("Erro ao salvar: " + error.message);
    } else {
      setTimeout(() => setSalvando(null), 1000);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-black text-black mb-6">🍴 Cardápio da Semana</h2>
      <div className="space-y-4">
        {dias.map((dia, index) => {
          const pratoExistente = pratos.find(p => p.dia_semana === index);
          return (
            <div key={dia} className="bg-white border-4 border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
              <label className="block text-xs font-black uppercase text-orange-600 mb-1">
                {dia} {salvando === index && <span className="text-green-600 normal-case ml-2">● Salvando...</span>}
              </label>
              <input 
                className="w-full text-lg font-black text-black outline-none placeholder-gray-300 bg-transparent"
                placeholder="O que teremos hoje?"
                defaultValue={pratoExistente?.prato_nome || ''}
                onBlur={(e) => salvarNoBanco(index, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}