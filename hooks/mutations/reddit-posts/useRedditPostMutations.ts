import {
  findRedditPosts,
  generateReplyForRedditPost,
  getRedditPostDetails,
} from "@/lib/api/reddit-posts";
import { useMutation } from "@tanstack/react-query";

export function useRedditPostMutations() {
  const findRedditPostsMutation = useMutation({
    mutationFn: findRedditPosts,
  });

  const getRedditPostDetailsMutation = useMutation({
    mutationFn: getRedditPostDetails,
  });

  const generateReplyForRedditPostMutation = useMutation({
    mutationFn: generateReplyForRedditPost,
    onError: (error) => {
      console.error("Error generating reply for Reddit post: ", error);
    },
  });

  return {
    findRedditPostsMutation,
    getRedditPostDetailsMutation,
    generateReplyForRedditPostMutation,
  };
}
