import { createClient } from "@/lib/supabase/component";

interface GetRedditPostDetailsInterface {
  postUrl: string;
}

interface RedditPostDetails {
  title: string;
  selftext: string;
}

export async function getRedditPostDetails({
  postUrl,
}: GetRedditPostDetailsInterface): Promise<RedditPostDetails> {
  const res = await fetch(`${postUrl}.json`);
  const data = await res.json();
  const post = data[0].data.children[0].data;
  return {
    title: post.title,
    selftext: post.selftext,
    ...post,
  };
}
