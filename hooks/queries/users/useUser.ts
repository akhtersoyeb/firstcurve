import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { getUser } = useAuth();
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
}
