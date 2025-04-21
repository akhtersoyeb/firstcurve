import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useAuth from "./useAuth";

export default function useSubscription() {
  const router = useRouter();
  const { userQuery } = useAuth()

  async function getBaseSubscriptionDetails() {
    const product_id = process.env.NEXT_PUBLIC_DODO_PAYMENTS_BASE_PLAN_ID;
    const res = await fetch(
      `/api/dodopayments/products/details?product_id=${product_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch subscription details");
    }
    return data.data;
  }

  const baseSubscriptionDetailsQuery = useQuery({
    queryKey: ["dodopayments", "products"],
    queryFn: getBaseSubscriptionDetails,
  });

  async function checkoutBasePlan() {
    const origin = window.location.origin;
    const productId = process.env.NEXT_PUBLIC_DODO_PAYMENTS_BASE_PLAN_ID;
    let base_url = `https://checkout.dodopayments.com/buy/${productId}`;
    if (process.env.NODE_ENV === "development") {
      base_url = `https://test.checkout.dodopayments.com/buy/${productId}`;
    }
    const url = new URL(base_url);
    url.searchParams.set("quantity", "1");
    url.searchParams.set("email", userQuery.data.email);
    url.searchParams.set("disableEmail", "true");
    url.searchParams.set("redirect_url", `${origin}/checkout`);
    let checkoutUrl = url.toString();
    router.push(checkoutUrl);
  }

  const checkoutBasePlanMutation = useMutation({
    mutationFn: checkoutBasePlan,
  });

  return {
    baseSubscriptionDetailsQuery,
    checkoutBasePlanMutation,
  };
}
