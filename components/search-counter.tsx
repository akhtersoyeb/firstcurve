import { Search, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchCountForToday } from "@/hooks/queries/search-logs";
import { useEffect, useState } from "react";

interface SearchCounterProps {
  // searchesUsed?: number;
  maxSearches?: number;
  onSearchLimitReached?: () => void;
}

export default function SearchCounter({
  // searchesUsed = 3,
  maxSearches = 10,
  onSearchLimitReached,
}: SearchCounterProps) {
  const counterQuery = useSearchCountForToday();

  const [searchCount, setSearchCount] = useState(0);
  const remainingSearches = maxSearches - searchCount;

  useEffect(() => {
    if (counterQuery.data && counterQuery.isSuccess) {
      setSearchCount(counterQuery.data);
    }
  }, [counterQuery.data, counterQuery.isSuccess]);

  const progressPercentage = (searchCount / maxSearches) * 100;

  // Determine the visual state based on remaining searches
  const getCounterState = () => {
    if (remainingSearches === 0) return "exhausted";
    if (remainingSearches <= 2) return "warning";
    if (remainingSearches <= 5) return "caution";
    return "normal";
  };

  const state = getCounterState();

  // Color schemes for different states
  const stateConfig = {
    normal: {
      badgeVariant: "secondary" as const,
      progressColor: "bg-blue-500",
      textColor: "text-muted-foreground",
      iconColor: "text-blue-500",
    },
    caution: {
      badgeVariant: "secondary" as const,
      progressColor: "bg-yellow-500",
      textColor: "text-yellow-600",
      iconColor: "text-yellow-500",
    },
    warning: {
      badgeVariant: "destructive" as const,
      progressColor: "bg-orange-500",
      textColor: "text-orange-600",
      iconColor: "text-orange-500",
    },
    exhausted: {
      badgeVariant: "destructive" as const,
      progressColor: "bg-red-500",
      textColor: "text-red-600",
      iconColor: "text-red-500",
    },
  };

  const config = stateConfig[state];

  return (
    <TooltipProvider>
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background/50 backdrop-blur-sm border">
        {/* Search Icon with state indication */}
        <div className="relative">
          <Search
            className={`h-4 w-4 ${config.iconColor} transition-colors duration-200`}
          />
          {state === "warning" || state === "exhausted" ? (
            <AlertTriangle className="h-2 w-2 text-red-500 absolute -top-1 -right-1 animate-pulse" />
          ) : null}
        </div>

        {/* Counter Display */}
        <div className="flex items-center gap-2 min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Badge
                  variant={config.badgeVariant}
                  className="text-xs font-medium px-2 py-1 transition-colors duration-200"
                >
                  {searchCount}/{maxSearches}
                </Badge>

                {/* Progress Bar */}
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${config.progressColor} transition-all duration-300 ease-out rounded-full`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-center">
              <div className="space-y-1">
                <p className="font-medium">
                  {remainingSearches > 0
                    ? `${remainingSearches} searches remaining`
                    : "Daily limit reached"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Resets daily at midnight
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Status Text (hidden on mobile) */}
        <div className="hidden sm:block">
          <span
            className={`text-xs font-medium ${config.textColor} transition-colors duration-200`}
          >
            {state === "exhausted"
              ? "Limit reached"
              : state === "warning"
              ? "Almost done"
              : state === "caution"
              ? "Running low"
              : "Search Count"}
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
}
