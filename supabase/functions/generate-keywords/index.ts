import { createClient } from "npm:@supabase/supabase-js";
import { GoogleGenAI } from "npm:@google/genai";

// Placeholder for Gemini API call
async function generateKeywordsWithGemini(product: {
  name: string;
  description: string;
}) {
  const ai = new GoogleGenAI({ apiKey: Deno.env.get("GEMINI_API_KEY")! });
  // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
  You are a marketing assistant helping generate Reddit keyword search queries.
  
  Product Name: "${product.name}"
  Description: "${product.description}"
  
  Generate a list of 8-10 short and relevant keyword phrases that could be used in Google Search to find Reddit discussions for marketing this product. Do NOT include hashtags or generic terms like "Reddit". Focus on search-intent keywords, e.g. "best productivity apps reddit", "notion vs evernote reddit", etc.
  
  Return ONLY a plain array of keywords.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  // console.log("ai response: ", response.text);
  const cleanResponse = response.text.replace(/```/g, "").trim();
  const keywords = JSON.parse(cleanResponse);
  return keywords;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const { product_id } = await req.json();
  if (!product_id) {
    return new Response(JSON.stringify({ error: "product_id is required" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization") } } }
  );

  // Fetch product
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("id, name, description")
    .eq("id", product_id)
    .single();

  if (fetchError || !product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 404,
    });
  }

  const keywords = await generateKeywordsWithGemini(product);

  return new Response(JSON.stringify({ keywords }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
