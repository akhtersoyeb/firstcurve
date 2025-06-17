import { serve } from 'std/server';
import { createClient } from '@supabase/supabase-js';

// Placeholder for Gemini API call
async function analyzeWithGemini(result: any, product: any) {
  // TODO: Replace with actual Gemini 2.0 Flash API call
  return Math.random(); // Dummy relevance score
}

serve(async (req) => {
  const { product_id } = await req.json();
  if (!product_id) {
    return new Response(JSON.stringify({ error: 'product_id is required' }), { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Fetch product
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, name, description')
    .eq('id', product_id)
    .single();
  if (productError || !product) {
    return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
  }

  // Fetch search results
  const { data: results, error: resultsError } = await supabase
    .from('search_results')
    .select('id, result_json')
    .eq('product_id', product_id);
  if (resultsError || !results) {
    return new Response(JSON.stringify({ error: 'No search results found' }), { status: 404 });
  }

  // Analyze and update relevance scores
  for (const result of results) {
    const score = await analyzeWithGemini(result.result_json, product);
    await supabase
      .from('search_results')
      .update({ relevance_score: score })
      .eq('id', result.id);
  }

  return new Response(JSON.stringify({ message: 'Relevance scores updated' }), { status: 200 });
}); 