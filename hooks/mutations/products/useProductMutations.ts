import { createProduct } from "@/lib/api/products";
import { useMutation } from "@tanstack/react-query";

export default function useProductMutations() {
  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });

  return { createProductMutation };
}
