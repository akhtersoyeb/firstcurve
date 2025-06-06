import { RedditSearchResult } from "@/types/reddit-search-result";
import { SquareArrowOutUpRight, Wand } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { STATIC_GENERATED_REPLY } from "@/lib/statics";
import { useState } from "react";
import GeneratedReply from "@/components/product/generated-reply";

interface SearchResultCardProps {
  item: RedditSearchResult;
}

function SearchResultCard({ item }: SearchResultCardProps) {
  const [showGeneratedReply, setShowGeneratedReply] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg text-[#171717] mb-2">
            {item.title}
          </h3>
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            // variant="ghost"
            // size="icon"
            className="text-gray-500 hover:text-gray-700"
          >
            <SquareArrowOutUpRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="text-gray-600 text-sm mb-4">{item.description}</p>

        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-500">
            Relevance Score: {item.relevanceScore}
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGeneratedReply(true)}
              // className="bg-gray-100 hover:bg-gray-200 text-[#171717] border-gray-200"
            >
              <Wand className="mr-2 h-4 w-4" />
              Generate Reply
            </Button>
          </div>
        </div>
        <GeneratedReply
          reply={showGeneratedReply ? STATIC_GENERATED_REPLY : undefined}
        />
      </div>
    </div>
  );
}

export default SearchResultCard;
