import { getProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/lib/query-keys";

export function useProducts() {
  return useQuery({
    queryKey: [...productQueryKeys.list],
    queryFn: () => getProducts(),
  });
}
