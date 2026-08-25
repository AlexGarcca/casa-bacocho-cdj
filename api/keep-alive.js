import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Jalamos las llaves que ya tienes guardadas en Vercel
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Hacemos una consulta minúscula solo para decirle a Supabase "¡Sigo vivo!"
  const { data, error } = await supabase.from('reviews').select('id').limit(1);

  if (error) {
    return res.status(500).json({ status: 'Error', error: error.message });
  }

  // Vercel y Supabase felices
  return res.status(200).json({ status: 'Ok', message: '¡Supabase despertado con éxito!' });
}