import { getProduct } from "@/lib/api/products";
import { productQueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

interface UseProductInterface {
  slug: string;
}

export function useProduct({ slug }: UseProductInterface) {
  return useQuery({
    queryKey: [...productQueryKeys.detail, slug],
    queryFn: () => getProduct({ slug: slug }),
    enabled: !!slug,
  });
}
