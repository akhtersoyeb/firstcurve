import React from "react";
import RedditPostCard from "./reddit-post-card";
import { useRedditPosts } from "@/hooks/queries/reddit-posts";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { Keyword } from "@/types/keyword";

interface RedditPostsInterface {
  selectedKeyword: Keyword;
  containerClassname?: string;
}

function RedditPosts({
  selectedKeyword,
  containerClassname = "",
}: RedditPostsInterface) {
  const queryClient = useQueryClient();

  const redditPosts = useRedditPosts({ keyword: selectedKeyword });

  if (redditPosts?.data) {
    queryClient.invalidateQueries({ queryKey: ["search-logs"] });
    return (
      <div className={cn("space-y-4", containerClassname)}>
        {redditPosts.data.map((post) => (
          <RedditPostCard key={post.id} post={post} />
        ))}
      </div>
    );
  }

  if (redditPosts?.error) {
    return (
      <div className={cn("space-y-4", containerClassname)}>
        <div className="w-full h-96 flex flex-col items-center justify-center">
          <p className="text-red-400">
            Failed to load reddit posts. Something went wrong!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", containerClassname)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-32" />
      ))}
    </div>
  );
}

export default RedditPosts;
