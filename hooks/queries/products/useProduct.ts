import { getProduct } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

interface UseProductInterface {
  slug: string;
}

export function useProduct({ slug }: UseProductInterface) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct({ slug: slug }),
    enabled: !!slug,
  });
}
