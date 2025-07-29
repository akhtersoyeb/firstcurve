import { createClient } from "@/lib/supabase/component";
import { Keyword } from "@/types/keyword";

const supabase = createClient();

interface GetKeywordsInterface {
  productId: number;
}

export async function getKeywords({
  productId,
}: GetKeywordsInterface): Promise<Keyword[]> {
  const { data, error } = await supabase
    .from("product_keywords")
    .select("*")
    .eq("product_id", productId)
    .order("has_search_results", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
