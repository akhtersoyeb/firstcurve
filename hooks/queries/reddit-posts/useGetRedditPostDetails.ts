import { getRedditPostDetails } from "@/lib/api/reddit-posts";
import { redditPostQueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

interface UseGetRedditPostDetailsInterface {
  postUrl: string;
}

export function useGetRedditPostDetails({
  postUrl,
}: UseGetRedditPostDetailsInterface) {
  return useQuery({
    queryKey: [...redditPostQueryKeys.detail, postUrl],
    queryFn: () => getRedditPostDetails({ postUrl: postUrl }),
    enabled: !!postUrl,
  });
}
