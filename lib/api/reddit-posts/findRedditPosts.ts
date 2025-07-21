import { createClient } from "@/lib/supabase/component";
import { RedditPost } from "@/types/reddit-post";
import { getKeyword } from "../keywords/getKeyword";

const supabase = createClient();

interface FindRedditPostsInterface {
  keywordId: number;
}

export async function findRedditPosts({
  keywordId,
}: FindRedditPostsInterface): Promise<RedditPost[]> {
  const keyword = await getKeyword({ id: keywordId });
  const { data, error } = await supabase.functions.invoke("search-keyword", {
    body: { keywordId: keywordId },
  });

  if (error) {
    throw error;
  }

  const redditPosts = await saveRedditPosts({
    redditPosts: data.results,
    keywordId: keyword.id,
    productId: keyword.product_id,
  });

  return redditPosts;
}

interface SaveRedditPostsInterface {
  productId: number;
  keywordId: number;
  redditPosts: RedditPost[];
}

async function saveRedditPosts({
  redditPosts,
  keywordId,
  productId,
}: SaveRedditPostsInterface): Promise<RedditPost[]> {
  const { data, error } = await supabase
    .from("product_search_results")
    .insert(
      redditPosts.map((item) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        product_id: productId,
        product_keyword_id: keywordId,
      }))
    )
    .select();

  if (error) {
    throw error;
  }

  return data;
}
