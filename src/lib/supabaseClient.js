
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificação de segurança para o console (ajuda a descobrir se a chave sumiu)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro: Chaves do Supabase não encontradas no ambiente!");
}

// Apenas para teste, remova depois!
console.log("URL do Supabase configurada?", !!process.env.NEXT_PUBLIC_SUPABASE_URL);

export const supabase = createClient(supabaseUrl, supabaseAnonKey)