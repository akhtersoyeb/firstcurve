import { create } from "zustand";

interface SearchLogsStore {
  currentSearchCount: number;
  maxSearchCountLimit: number;
  resetTime: Date | string | null;
  isLimitExhaustedModalOpen: boolean;
  setCurrentSearchCount: (newCount: number) => void;
  setMaxSearchCountLimit: (newLimit: number) => void;
  increaseCount: () => void;
  resetCount: () => void;
  setResetTime: (time: Date | string | null) => void;
  setIsLimitExhaustedModalOpen: (value: boolean) => void;
}

// Helper to get UTC midnight in user's local time
const getDefaultResetTime = (): string => {
  const now = new Date();
  const utcResetTime = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );
  const localResetTime = utcResetTime?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return localResetTime;
};

const useSearchLogsStore = create<SearchLogsStore>((set) => ({
  currentSearchCount: 0,
  maxSearchCountLimit: 10,
  resetTime: getDefaultResetTime(),
  isLimitExhaustedModalOpen: false,

  setCurrentSearchCount: (newCount) => set({ currentSearchCount: newCount }),
  setMaxSearchCountLimit: (newLimit) => set({ maxSearchCountLimit: newLimit }),
  increaseCount: () =>
    set((state) => ({ currentSearchCount: state.currentSearchCount + 1 })),
  resetCount: () => set({ currentSearchCount: 0 }),
  setResetTime: (time) => set({ resetTime: time }),
  setIsLimitExhaustedModalOpen: (value) =>
    set({ isLimitExhaustedModalOpen: value }),
}));

export default useSearchLogsStore;
