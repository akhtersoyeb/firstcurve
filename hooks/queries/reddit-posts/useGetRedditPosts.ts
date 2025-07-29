import { findRedditPosts, getRedditPosts } from "@/lib/api/reddit-posts";

import { useQuery } from "@tanstack/react-query";

interface UseGetRedditPostsInterface {
  keywordId: number;
}

export function useGetRedditPosts({ keywordId }: UseGetRedditPostsInterface) {
  return useQuery({
    queryKey: ["reddit-posts", "list", keywordId],
    queryFn: async () => {
      const savedResults = await getRedditPosts({ keywordId: keywordId });
      if (savedResults.length > 0) {
        return savedResults;
      } else {
        const newlySavedResults = await findRedditPosts({
          keywordId: keywordId,
        });
        return newlySavedResults;
      }
    },
    enabled: !!keywordId,
  });
}
