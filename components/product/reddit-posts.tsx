import React from "react";
import RedditPostCard from "./reddit-post-card";
import { useRedditPosts } from "@/hooks/queries/reddit-posts";
import { cn } from "@/lib/utils";

interface RedditPostsInterface {
  keywordId: number;
  containerClassname?: string;
}

function RedditPosts({
  keywordId,
  containerClassname = "",
}: RedditPostsInterface) {
  const redditPosts = useRedditPosts({ keywordId: keywordId });

  if (redditPosts.data) {
    return (
      <div className={cn("space-y-4", containerClassname)}>
        {redditPosts.data.map((post) => (
          <RedditPostCard key={post.id} post={post} />
        ))}
      </div>
    );
  }

  return <div className={cn("space-y-4", containerClassname)}>Loading...</div>;
}

export default RedditPosts;
