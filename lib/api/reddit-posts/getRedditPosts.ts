import { createClient } from "@/lib/supabase/component";
import { RedditPost } from "@/types/reddit-post";
import { findRedditPosts } from "./findRedditPosts";

const supabase = createClient();

interface GetRedditPostsInterface {
  keywordId: number;
}

export async function getRedditPosts({
  keywordId,
}: GetRedditPostsInterface): Promise<RedditPost[]> {
  const { data, error } = await supabase
    .from("product_search_results")
    .select("*")
    .eq("product_keyword_id", keywordId);
  if (error) {
    throw error;
  }
  if (data.length > 0) {
    return data;
  }

  // no search results for the keyword, so do a new search
  const redditPosts = await findRedditPosts({ keywordId: keywordId });
  return redditPosts;
}
