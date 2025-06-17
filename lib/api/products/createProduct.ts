import { createClient } from "@/lib/supabase/component";
import { Product } from "@/types/product";

const supabase = createClient();

interface CreateProductInterface {
  name: string;
  description: string;
}

export async function createProduct({
  name,
  description,
}: CreateProductInterface): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      description,
    })
    .select("*");

  if (error) {
    throw error;
  }

  return data[0];
}
