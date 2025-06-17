import { createClient } from "@/lib/supabase/component";
import { RedditPost } from "@/types/reddit-post";

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
  return data;
}
