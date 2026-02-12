"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Cardapio from '../components/Cardapio';
import ListaCompras from '../components/ListaCompras';
import Limpeza from '../components/Limpeza';

export default function Home() {
  const [session, setSession] = useState(null);
  const [aba, setAba] = useState('inicio');

  useEffect(() => {
    // 1. Verifica se já existe uma sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Escuta mudanças no login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Se não estiver logado, mostra apenas a tela de Login
  if (!session) {
    return <Login />;
  }

  // Se estiver logado, mostra o sistema normal
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white shadow-sm sticky top-0 z-20 p-4 mb-6 flex justify-between items-center">
        <div className="max-w-4xl mx-auto flex gap-4 font-bold text-gray-500 text-xs uppercase">
          <button onClick={() => setAba('inicio')} className={aba === 'inicio' ? "text-blue-600 border-b-2 border-blue-600" : ""}>INÍCIO</button>
          <button onClick={() => setAba('cardapio')} className={aba === 'cardapio' ? "text-blue-600 border-b-2 border-blue-600" : ""}>CARDÁPIO</button>
          <button onClick={() => setAba('limpeza')} className={aba === 'limpeza' ? "text-blue-600 border-b-2 border-blue-600" : ""}>LIMPEZA</button>
          <button onClick={() => setAba('compras')} className={aba === 'compras' ? "text-blue-600 border-b-2 border-blue-600" : ""}>COMPRAS</button>
        </div>
        <button 
          onClick={() => supabase.auth.signOut()} 
          className="text-gray-400 text-xs font-bold hover:text-red-500"
        >
          SAIR
        </button>
      </nav>

      {aba === 'inicio' && <Dashboard />}
      {aba === 'cardapio' && <Cardapio />}
      {aba === 'limpeza' && <Limpeza />}
      {aba === 'compras' && <ListaCompras />}
    </main>
  );
}