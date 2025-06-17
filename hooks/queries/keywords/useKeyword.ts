import { getKeyword } from "@/lib/api/keywords";
import { useQuery } from "@tanstack/react-query";

interface UseKeywordInterface {
  id: number;
}

export function useKeyword({ id }: UseKeywordInterface) {
  return useQuery({
    queryKey: ["keyword", id],
    queryFn: () => getKeyword({ id: id }),
    enabled: !!id,
  });
}
