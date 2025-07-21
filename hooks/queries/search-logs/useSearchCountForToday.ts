import { getSearchCountForToday } from "@/lib/api/search-logs";
import { useQuery } from "@tanstack/react-query";

export function useSearchCountForToday() {
  return useQuery({
    queryKey: ["search-logs"],
    queryFn: () => getSearchCountForToday(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
