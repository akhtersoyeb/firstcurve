import { getKeywords } from "@/lib/api/keywords";
import { keywordQueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

interface UseKeywordsInterface {
  productId: number;
}

export function useKeywords({ productId }: UseKeywordsInterface) {
  return useQuery({
    queryKey: [...keywordQueryKeys.list, productId],
    queryFn: () => getKeywords({ productId: productId }),
    enabled: !!productId,
  });
}
