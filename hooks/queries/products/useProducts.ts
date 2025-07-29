import { getProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/queries/users";

export function useProducts() {
  // const user = useUser()
  return useQuery({
    queryKey: ["product", "list"],
    queryFn: () => getProducts(),
    // enabled: !!user.data,
  });
}
