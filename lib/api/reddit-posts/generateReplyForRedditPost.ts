import { createClient } from "@/lib/supabase/component";
import { getRedditPostDetails } from "./getRedditPostDetails";

const supabase = createClient();

interface GenerateReplyForRedditPostInterface {
  searchResultId: number;
}

export async function generateReplyForRedditPost({
  searchResultId,
}: GenerateReplyForRedditPostInterface): Promise<string> {
  const { data: searchResult, error: searchResultError } = await supabase
    .from("product_search_results")
    .select("*")
    .eq("id", searchResultId)
    .single();

  if (searchResultError) {
    throw searchResultError;
  }

  if (searchResult.generated_reply) {
    return searchResult.generated_reply;
  }

  // Generate new reply
  const postDetails = await getRedditPostDetails({
    postUrl: searchResult.link,
  });

  const { data, error } = await supabase.functions.invoke("generate-reply", {
    body: {
      search_result_id: searchResultId,
      post_title: postDetails.title,
      post_body: postDetails.selftext || "This post has no body.",
    },
  });

  if (error) {
    throw error;
  }

  return data.reply;
}
