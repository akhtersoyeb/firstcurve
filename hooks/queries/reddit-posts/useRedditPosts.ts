import { getRedditPosts } from "@/lib/api/reddit-posts";
import { useQuery } from "@tanstack/react-query";

interface UseRedditPostsInterface {
  keywordId: number;
}

export function useRedditPosts({ keywordId }: UseRedditPostsInterface) {
  return useQuery({
    queryKey: ["reddit-posts", "list", keywordId],
    queryFn: () => getRedditPosts({ keywordId: keywordId }),
    enabled: !!keywordId,
  });
}
