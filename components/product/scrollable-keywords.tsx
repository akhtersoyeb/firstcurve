import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface KeywordProps {
  keywords: string[];
  selectedKeyword?: string;
  onKeywordClick?: (keyword: string) => void;
}

export default function ScrollableKeywords({
  keywords,
  selectedKeyword,
  onKeywordClick,
}: KeywordProps) {
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
        {keywords.map((keyword) => (
          <button
            key={keyword}
            onClick={() => onKeywordClick?.(keyword)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-md border border-dashed border-gray-400 transition-all",
              selectedKeyword === keyword
                ? "bg-yellow-200 border-solid border-yellow-400"
                : "hover:bg-gray-100"
            )}
          >
            {keyword}
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
