import { createProduct, deleteProduct } from "@/lib/api/products";
import { Product } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useProductMutations() {
  const queryClient = useQueryClient();
  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,

    // Optimistically update UI before the mutation finishes
    onMutate: async ({ productId }: { productId: number }) => {
      await queryClient.cancelQueries({ queryKey: ["product", "list"] });

      const previousData = queryClient.getQueryData(["product", "list"]);

      queryClient.setQueryData(["product", "list"], (old: any) => {
        return old?.filter((product: Product) => product.id !== productId);
      });

      return { previousData };
    },

    // If mutation fails, rollback
    onError: (_err, _productId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["product", "list"], context.previousData);
      }
    },

    // After success or error, revalidate
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product", "list"] });
    },
  });

  return { createProductMutation, deleteProductMutation };
}
