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

  const { keywordId } = await req.json();
  if (!keywordId) {
    return new Response(JSON.stringify({ error: "keywordId is required" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization") } } }
  );

  // get user
  const authHeader = req.headers.get("Authorization")!;
  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  // get user profile and add search limitation
  const { data: userProfile, error: userProfileRetrivalError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);

  const { count: searchCountForToday, error: searchCountError } = await supabase
    .from("user_search_log")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", startOfToday.toISOString())
    .lt("created_at", endOfToday.toISOString());

  if (userProfile.subscription_id === null) {
    // free user
    if (searchCountForToday >= 10) {
      return new Response(JSON.stringify({ error: "Search limit exceeded." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
  }

  const { data: keyword, error: keywordError } = await supabase
    .from("product_keywords")
    .select("*")
    .eq("id", keywordId)
    .single();

  if (keywordError) {
    return new Response(JSON.stringify({ error: "Keyword not found." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const response = await googleSearch(keyword);
  const results = response.items.map((item) => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
  }));

  // Add a search log for user
  await supabase
    .from("user_search_log")
    .insert({
      user_id: user.id,
      keyword_id: keyword.id,
      product_id: keyword.product_id,
    })
    .select()
    .single();

  return new Response(JSON.stringify({ results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
