import { getSearchCountForToday } from "@/lib/api/search-logs";
import { searchLogQueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useSearchCountForToday() {
  return useQuery({
    queryKey: [...searchLogQueryKeys.detail],
    queryFn: () => getSearchCountForToday(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
