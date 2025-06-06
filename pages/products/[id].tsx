import AppLayout from "@/components/layout/app-layout";
import ScrollableKeywords from "@/components/product/scrollable-keywords";
import SearchResultCard from "@/components/product/search-result-card";
import { Button } from "@/components/ui/button";
import { STATIC_KEYWORDS, STATIC_SEARCH_RESULTS } from "@/lib/statics";
import { Search } from "lucide-react";
import { useState } from "react";

function SearchResultsPage() {
  const [selectedKeyword, setSelectedKeyword] = useState("Notion app tutorial");
  const keywords = STATIC_KEYWORDS;
  return (
    <>
      <AppLayout>
        <main className="container mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-light">Search Results</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <Search />
                New Search
              </Button>
            </div>
          </div>
          <div className="">
            <ScrollableKeywords
              keywords={keywords}
              selectedKeyword={selectedKeyword}
              onKeywordClick={setSelectedKeyword}
            />
          </div>
          <div className="space-y-4">
            {STATIC_SEARCH_RESULTS.map((result) => (
              <SearchResultCard key={result.title} item={result} />
            ))}
          </div>
        </main>
      </AppLayout>
    </>
  );
}

export default SearchResultsPage;
