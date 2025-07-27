import { Keyword } from "@/types/keyword";
import { create } from "zustand";

interface UseKeywordsStore {
  selectedKeyword?: Keyword;
  previousKeyword?: Keyword;
  setSelectedKeyword: (keyword: Keyword | undefined) => void;
}

const useKeywordsStore = create<UseKeywordsStore>((set) => ({
  selectedKeyword: undefined,
  previousKeyword: undefined,

  setSelectedKeyword: (keyword) => {
    set((state) => ({
      previousKeyword: state.selectedKeyword,
      selectedKeyword: keyword,
    }));
  },
}));

export default useKeywordsStore;
