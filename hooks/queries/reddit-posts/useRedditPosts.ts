import { findRedditPosts, getRedditPosts } from "@/lib/api/reddit-posts";
import useKeywordsStore from "@/stores/useKeywordsStore";
import useSearchLogsStore from "@/stores/useSearchLogsStore";
import { Keyword } from "@/types/keyword";
import { useQuery } from "@tanstack/react-query";

interface UseRedditPostsInterface {
  keyword: Keyword;
}

export function useRedditPosts({ keyword }: UseRedditPostsInterface) {
  const {
    currentSearchCount,
    maxSearchCountLimit,
    isLimitExhaustedModalOpen,
    setIsLimitExhaustedModalOpen,
  } = useSearchLogsStore();

  const { selectedKeyword, previousKeyword, setSelectedKeyword } =
    useKeywordsStore();

  return useQuery({
    queryKey: ["reddit-posts", "list", keyword?.id],
    queryFn: async () => {
      const previouslySavedPosts = await getRedditPosts({
        keywordId: keyword?.id,
      });
      if (previouslySavedPosts.length === 0) {
        if (
          currentSearchCount >= maxSearchCountLimit &&
          !isLimitExhaustedModalOpen
        ) {
          setIsLimitExhaustedModalOpen(true);
          setSelectedKeyword(previousKeyword);
          console.log("selected keyword: ", previousKeyword);
          return await getRedditPosts({
            keywordId: previousKeyword?.id as number,
          });
        }
        const newlyFoundPosts = await findRedditPosts({
          keywordId: keyword.id,
        });
        return newlyFoundPosts;
      } else {
        return previouslySavedPosts;
      }
    },
    enabled: !!keyword,
  });
}
