import { findRedditPosts } from "@/lib/api/reddit-posts";
import { useMutation } from "@tanstack/react-query";

export function useRedditPostMutations() {
  const findRedditPostsMutation = useMutation({
    mutationFn: findRedditPosts,
  });

  return { findRedditPostsMutation };
}
