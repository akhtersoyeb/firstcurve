import { createClient } from "@/lib/supabase/component";
import { Product } from "@/types/product";

const supabase = createClient();

interface DeleteProductInterface {
  productId: number;
}

export async function deleteProduct({
  productId,
}: DeleteProductInterface): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
