import { RedditPost } from "@/types/reddit-post";
import { SquareArrowOutUpRight, Wand } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GeneratedReply from "@/components/product/generated-reply";
import { useRedditPostMutations } from "@/hooks/mutations/reddit-posts";

interface SearchResultCardProps {
  post: RedditPost;
}

function RedditPostCard({ post }: SearchResultCardProps) {
  const { generateReplyForRedditPostMutation } = useRedditPostMutations();
  const [showGeneratedReply, setShowGeneratedReply] = useState(false);
  const [generatedReply, setGeneratedReply] = useState<string | null>(
    post.generated_reply ?? null
  );

  async function handleGenerateReply() {
    const reply = await generateReplyForRedditPostMutation.mutateAsync({
      searchResultId: post.id,
    });
    setGeneratedReply(reply);
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg text-[#171717] mb-2">
            {post.title}
          </h3>
          <Link
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            // variant="ghost"
            // size="icon"
            className="text-gray-500 hover:text-gray-700"
          >
            <SquareArrowOutUpRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="text-gray-600 text-sm mb-4">{post.snippet}</p>

        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-500">
            Relevance Score: Unknown
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateReply}
              disabled={
                generateReplyForRedditPostMutation.isPending ||
                (post.generated_reply ? true : false)
              }
              // className="bg-gray-100 hover:bg-gray-200 text-[#171717] border-gray-200"
            >
              <Wand className="mr-2 h-4 w-4" />
              Generate Reply
            </Button>
          </div>
        </div>
        <GeneratedReply
          reply={generatedReply}
          showGeneratedReply={showGeneratedReply}
          isLoading={generateReplyForRedditPostMutation.isPending}
        />
      </div>
    </div>
  );
}

export default RedditPostCard;
