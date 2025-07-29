import { createClient } from "@/lib/supabase/component";
import { Product } from "@/types/product";

const supabase = createClient();

export async function getProducts(): Promise<Product[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  return data;
}
