import { createClient } from "npm:@supabase/supabase-js";
import { GoogleGenAI } from "npm:@google/genai";

// Placeholder for Gemini API call
async function generateReplyWithGemini({
  product,
  post,
}: {
  product: {
    name: string;
    description: string;
  };
  post: {
    title: string;
    body: string;
  };
}) {
  const ai = new GoogleGenAI({ apiKey: Deno.env.get("GEMINI_API_KEY")! });
  // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
  You are a Reddit engagement specialist. Your task is to reply to a given Reddit post in a way that:

1. Solves or helps with the original poster's (OP's) problem or question.
2. Encourages healthy discussion with other Redditors.
3. Naturally and subtly mentions the provided product as part of the value you offer — without hard selling or spamming.

**Input:**

- Reddit post title: "${post.title}"
- Reddit post description: "${post.body}"
- Product name: "${product.name}"
- Product description: "${product.description}"

**Instructions:**

- Carefully read the title and description to identify OP's main question, problem, or discussion point.
- Provide a thoughtful, clear, and actionable reply addressing their need.
- Offer at least one concrete suggestion or useful insight directly related to their post.
- Integrate the product by explaining briefly how it may help in the context—keep it subtle and relevant.
- Keep the tone friendly, conversational, and human. Do not sound like an ad.
- End your reply with an open-ended question to invite further discussion.
- Follow Reddit's global and subreddit-specific rules. Avoid direct links unless explicitly allowed.
- Don't add 'OP' or 'Original Poster' in the reply. 
- Output only the final reply text. Do not include any introductions, disclaimers, prefaces, summaries, or "Sure, I can help" type phrases. Only return the comment exactly as it should appear on Reddit.

**Output Format:**
A single, ready-to-post Reddit comment that looks organic, helpful, and subtly includes the product. Avoid sounding scripted or repetitive.

  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  const cleanResponse = response.text.replace(/```/g, "").trim();
  return cleanResponse;
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
  const { search_result_id, post_title, post_body } = await req.json();

  if (!search_result_id) {
    return new Response(
      JSON.stringify({ error: "search_result_id is required" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  if (!post_title) {
    return new Response(JSON.stringify({ error: "post_title is required" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  if (!post_body) {
    return new Response(JSON.stringify({ error: "post_body is required" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization") } } }
  );

  // Fetch search result
  const { data: searchResult, error: searchResultError } = await supabase
    .from("product_search_results")
    .select("*")
    .eq("id", search_result_id)
    .single();

  if (searchResultError || !searchResult) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch search result." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      }
    );
  }

  // Fetch product
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", searchResult.product_id)
    .single();

  if (fetchError || !product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 404,
    });
  }

  const generatedReply = await generateReplyWithGemini({
    product: product,
    post: { title: post_title, body: post_body },
  });

  // Update search result with generated reply
  await supabase
    .from("product_search_results")
    .update({ generated_reply: generatedReply })
    .eq("id", search_result_id);

  return new Response(JSON.stringify({ reply: generatedReply }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
