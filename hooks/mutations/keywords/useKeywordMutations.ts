import { generateKeywords } from "@/lib/api/keywords";
import { useMutation } from "@tanstack/react-query";

export default function useKeywordMutations() {
  const generateKeywordsMutation = useMutation({
    mutationFn: generateKeywords,
  });

  return { generateKeywordsMutation };
}
