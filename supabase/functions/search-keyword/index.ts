import { createClient } from "npm:@supabase/supabase-js";

// Placeholder for Google Custom Search API call
async function googleSearch(keyword: string) {
  const searchUrl = new URL("https://www.googleapis.com/customsearch/v1");
  searchUrl.searchParams.append("key", Deno.env.get("GOOGLE_SEARCH_API_KEY"));
  searchUrl.searchParams.append(
    "cx",
    Deno.env.get("GOOGLE_CUSTOM_SEARCH_ENGINE_ID")
  );
  searchUrl.searchParams.append("q", keyword);
  searchUrl.searchParams.append("num", "10");
  searchUrl.searchParams.append("start", "1");
  // Make request to Google Search API
  const response = await fetch(searchUrl.toString());
  const data = await response.json();
  return data;
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

  const { keyword } = await req.json();
  if (!keyword) {
    return new Response(JSON.stringify({ error: "keyword is required" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization") } } }
  );

  const response = await googleSearch(keyword);
  console.log("response", response);
  const items = response.items;
  const results = items.map((item) => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
  }));

  return new Response(JSON.stringify({ results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
