import { createClient } from "@/lib/supabase/component";
import { Keyword } from "@/types/keyword";

const supabase = createClient();

interface GenerateKeywordsInterface {
  productId: number;
}

export async function generateKeywords({
  productId,
}: GenerateKeywordsInterface): Promise<Keyword[]> {
  const { data, error } = await supabase.functions.invoke("generate-keywords", {
    body: { product_id: productId },
  });

  if (error) {
    throw error;
  }

  const generatedKeywords = await saveKeywords({
    productId: productId,
    keywords: data.keywords,
  });

  return generatedKeywords;
}

interface SaveKeywordsInterface {
  productId: number;
  keywords: string[];
}
async function saveKeywords({
  productId,
  keywords,
}: SaveKeywordsInterface): Promise<Keyword[]> {
  const { data, error } = await supabase
    .from("product_keywords")
    .insert(
      keywords.map((keyword) => ({
        value: keyword,
        product_id: productId,
      }))
    )
    .select();

  if (error) {
    throw error;
  }

  return data;
}
