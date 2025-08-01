import { getKeyword } from "@/lib/api/keywords";
import { keywordQueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

interface UseKeywordInterface {
  id: number;
}

export function useKeyword({ id }: UseKeywordInterface) {
  return useQuery({
    queryKey: [...keywordQueryKeys.detail, id],
    queryFn: () => getKeyword({ id: id }),
    enabled: !!id,
  });
}
