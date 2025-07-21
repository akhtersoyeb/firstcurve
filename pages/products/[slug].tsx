import AppLayout from "@/components/layout/app-layout";
import RedditPosts from "@/components/product/reddit-posts";
import ScrollableKeywords from "@/components/product/scrollable-keywords";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/queries/products";
import { Keyword } from "@/types/keyword";
import { RotateCcw, Search } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

function ProductDetailsPage() {
  const router = useRouter();
  const product = useProduct({ slug: router.query.slug as string });
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);

  if (product.data) {
    return (
      <>
        <AppLayout>
          <main className="container mx-auto space-y-4 py-4 px-4 md:px-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-light">
                  Here&apos;s reddit results for {product.data.name}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Button>
                  <RotateCcw />
                  Refresh Search Results
                </Button>
              </div>
            </div>
            <div className="">
              <ScrollableKeywords
                productId={product.data.id}
                selectedKeyword={selectedKeyword}
                setSelectedKeyword={setSelectedKeyword}
              />
            </div>
            {selectedKeyword && <RedditPosts keywordId={selectedKeyword?.id} />}
          </main>
        </AppLayout>
      </>
    );
  }

  return (
    <>
      <AppLayout></AppLayout>
    </>
  );
}

export default ProductDetailsPage;
