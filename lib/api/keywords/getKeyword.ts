import { createClient } from "@/lib/supabase/component";
import { Keyword } from "@/types/keyword";

const supabase = createClient();

interface GetKeywordInterface {
  id: number;
}

export async function getKeyword({
  id,
}: GetKeywordInterface): Promise<Keyword> {
  const { data, error } = await supabase
    .from("product_keywords")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
}
