import { useRef, useState, useEffect, SetStateAction, Dispatch } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useKeywords } from "@/hooks/queries/keywords";
import { Keyword } from "@/types/keyword";
import useKeywordsStore from "@/stores/useKeywordsStore";
import useSearchLogsStore from "@/stores/useSearchLogsStore";

interface KeywordProps {
  productId: number;
}

export default function ScrollableKeywords({ productId }: KeywordProps) {
  const { selectedKeyword, setSelectedKeyword } = useKeywordsStore();
  const {
    currentSearchCount,
    maxSearchCountLimit,
    isLimitExhaustedModalOpen,
    setIsLimitExhaustedModalOpen,
  } = useSearchLogsStore();
  const keywords = useKeywords({ productId: productId });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkForFades = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Check if scrolled from the left
    setShowLeftFade(container.scrollLeft > 20);

    // Check if can scroll more to the right
    setShowRightFade(
      container.scrollWidth > container.clientWidth &&
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 20
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Initial check
      checkForFades();

      // Add scroll event listener
      container.addEventListener("scroll", checkForFades);

      // Add resize event listener
      window.addEventListener("resize", checkForFades);

      return () => {
        container.removeEventListener("scroll", checkForFades);
        window.removeEventListener("resize", checkForFades);
      };
    }
  }, []);

  function handleKeywordClick({ keyword }: { keyword: Keyword }) {
    if (
      currentSearchCount >= maxSearchCountLimit &&
      !isLimitExhaustedModalOpen
    ) {
      setIsLimitExhaustedModalOpen(true);
      return;
    }
    setSelectedKeyword(keyword);
  }

  if (keywords.data) {
    if (
      !selectedKeyword ||
      (selectedKeyword && selectedKeyword.product_id !== productId)
    ) {
      setSelectedKeyword(keywords.data[0]);
    }
    return (
      <div className="relative max-w-full">
        {/* Left fade indicator */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300",
            showLeftFade ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-3 max-w-full"
        >
          {keywords.data.map((keyword) => (
            <button
              key={keyword.id}
              onClick={() => handleKeywordClick({ keyword: keyword })}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-md border border-dashed border-gray-400 transition-all",
                selectedKeyword && selectedKeyword.value === keyword.value
                  ? "bg-yellow-200 border-solid border-yellow-400"
                  : "hover:bg-gray-100",
                selectedKeyword &&
                  selectedKeyword.value !== keyword.value &&
                  keyword.has_search_results &&
                  "bg-blue-50 border-solid border-blue-50 hover:border-blue-100 hover:bg-blue-50"
              )}
            >
              {keyword.value}
            </button>
          ))}
        </div>

        {/* Right fade indicator */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300",
            showRightFade ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    );
  }

  // Error state
  if (keywords.error) {
    <>Something went wrong while loading keyword. Sorry for the bad UI.</>;
  }

  // Loading state
  return (
    <div className="relative max-w-full">
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300",
          showLeftFade ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-3 max-w-full"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-[42px] w-80 rounded-md" />
        ))}
      </div>

      <div
        className={cn(
          "absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300",
          showRightFade ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
