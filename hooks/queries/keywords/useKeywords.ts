import { getKeywords } from "@/lib/api/keywords";
import { useQuery } from "@tanstack/react-query";

interface UseKeywordsInterface {
  productId: number;
}

export function useKeywords({ productId }: UseKeywordsInterface) {
  return useQuery({
    queryKey: ["keyword", "list", productId],
    queryFn: () => getKeywords({ productId: productId }),
    enabled: !!productId,
  });
}
