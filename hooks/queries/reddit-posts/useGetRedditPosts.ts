import { findRedditPosts, getRedditPosts } from "@/lib/api/reddit-posts";
import { keywordQueryKeys, redditPostQueryKeys } from "@/lib/query-keys";
import { Keyword } from "@/types/keyword";

import { useQuery, useQueryClient } from "@tanstack/react-query";

interface UseGetRedditPostsInterface {
  keywordId: number;
}

export function useGetRedditPosts({ keywordId }: UseGetRedditPostsInterface) {
  const queryClient = useQueryClient();

  function optimisticallyUpdateKeyword(keywordId: number) {
    // Find the keyword in all product-specific keyword queries
    const allQueries = queryClient.getQueriesData<Keyword[]>({
      queryKey: [...keywordQueryKeys.list],
    });

    allQueries.forEach(([queryKey, keywords]) => {
      if (keywords) {
        const updatedKeywords = keywords.map((keyword) =>
          keyword.id === keywordId
            ? { ...keyword, has_search_results: true }
            : keyword
        );
        queryClient.setQueryData(queryKey, updatedKeywords);
      }
    });
  }

  return useQuery({
    queryKey: [...redditPostQueryKeys.list, keywordId],
    queryFn: async () => {
      const savedResults = await getRedditPosts({ keywordId: keywordId });
      if (savedResults.length > 0) {
        return savedResults;
      } else {
        const newlySavedResults = await findRedditPosts({
          keywordId: keywordId,
        });
        optimisticallyUpdateKeyword(keywordId);
        return newlySavedResults;
      }
    },
    enabled: !!keywordId,
  });
}
