import { createClient } from "@/lib/supabase/component";
import { Product } from "@/types/product";

const supabase = createClient();

interface GetProductInterface {
  slug: string;
}

export async function getProduct({
  slug,
}: GetProductInterface): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    throw error;
  }
  return data;
}
