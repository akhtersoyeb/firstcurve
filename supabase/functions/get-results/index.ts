import { serve } from 'std/server';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  const { product_id } = await req.json();
  if (!product_id) {
    return new Response(JSON.stringify({ error: 'product_id is required' }), { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: results, error } = await supabase
    .from('search_results')
    .select('id, keyword, result_json, relevance_score')
    .eq('product_id', product_id)
    .order('relevance_score', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ results }), { status: 200 });
}); 