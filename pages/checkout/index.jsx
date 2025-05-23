import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { createClient as createClientServer } from "@/lib/supabase/server-props";
import { useRouter } from "next/router";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import useAuth from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscription";
import { Skeleton } from "@/components/ui/skeleton";

// export async function getServerSideProps(context) {
//   const supabase = createClientServer(context)

//   const { data: userData, error: userError } = await supabase.auth.getUser()
//   const { data: profileData, error: profileError } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", userData.user.id)
//     .single();

//   if (
//     profileData?.subscription_id &&
//     profileData?.subscription_status
//   ) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {}
//   }
// }

export default function CheckoutPage() {
  const router = useRouter()
  const { signOutMutation } = useAuth();
  const { baseSubscriptionDetailsQuery, checkoutBasePlanMutation } =
    useSubscription();

  if (router.query?.subscription_id && router.query?.status) {
    if (router.query?.status === 'active') {
      toast.success(
        "Your subscription is active. You can now use the app.",
        {
          action: {
            label: "Go to Dashboard",
            onClick: () => router.push("/dashboard"),
          },
        }
      );
      router.push("/dashboard");
    } else if (router.query?.status === 'failed') {
      toast.error('Failed!', {
        description: "Your subscription payment failed. Please try again."
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#171717] flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col h-svh justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <h1 className="text-3xl font-bold text-[#171717] dark:text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Complete your subscription by providing your payment details
          </p>

          <Card className="bg-gray-100 dark:bg-gray-800 border-0 mb-8">
            <CardContent className="p-6">
              {baseSubscriptionDetailsQuery?.isLoading ? (
                <Skeleton className="w-24 h-8 rounded-md bg-slate-200" />
              ) : (
                <div className="text-2xl font-bold text-[#171717] dark:text-white mb-4">
                  $ {baseSubscriptionDetailsQuery?.data?.price?.price / 100}
                  <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
              )}
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    10 Product Searches Per Day
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    AI Opportunity Ratings
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    AI-Generated Replies
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Daily Updates
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Fast Performance
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Priority Support
                  </span>
                </li>
              </ul>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                By subscribing, you agree to our{" "}
                <a
                  className="underline"
                  href="/terms-of-service"
                  target="blank"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="underline" target="blank">
                  Privacy Policy
                </a>
                .
              </p>
            </CardContent>
          </Card>
          <Button
            onClick={async () => checkoutBasePlanMutation.mutateAsync()}
            className="w-full h-12 bg-[#171717] hover:bg-[#2a2a2a] text-white dark:bg-primary dark:hover:bg-primary/90"
            disabled={checkoutBasePlanMutation?.isPending}
          >
            {checkoutBasePlanMutation?.isPending ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                Processing...
              </span>
            ) : (
              "Continue"
            )}
          </Button>

          <div className="text-center mt-6">
            <Button
              onClick={async () => await signOutMutation.mutateAsync()}
              variant={"link"}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#171717] dark:hover:text-white transition-colors"
            >
              Want to login from another account?
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="relative h-svh w-1/2 overflow-hidden rounded-lg">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
      </div>
    </div>
  );
}
