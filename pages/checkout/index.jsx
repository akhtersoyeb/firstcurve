import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Loader2, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { loadRazorpay } from "@/lib/razorpay/load"
import { createClient as createClientServer } from "@/lib/supabase/server-props"
import { createClient as createClientComponent } from "@/lib/supabase/component"
import { useRouter } from "next/router"
import { FlickeringGrid } from "@/components/magicui/flickering-grid"

export async function getServerSideProps(context) {
  const supabase = createClientServer(context)

  const { data: userData, error: userError } = await supabase.auth.getUser()
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single()

  if (
    profileData?.subscription_id &&
    profileData?.subscription_status !== "created"
  ) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: userData.user,
      profile: profileData,
    },
  }
}

export default function CheckoutPage({ user }) {
  const router = useRouter()
  const supabase = createClientComponent()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // const {data: {user}} = await supabase.auth.getUser()

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
      // toast({
      //   title: "Signed out successfully",
      //   description: "You have been signed out of your account."
      // });
    } catch (error) {
      console.error("Error signing out:", error)
      // toast({
      //   title: "Error signing out",
      //   description: error.message,
      //   variant: "destructive"
      // });
    }
  }

  const handleCheckoutButton = async () => {
    try {
      setIsSubmitting(true)
      const res = await fetch(`/api/subscriptions/create`, {
        method: "POST",
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message ?? "Something went wrong at server side")
      }

      const subscription = data?.data
      const isRazorpayLoaded = await loadRazorpay()

      if (!isRazorpayLoaded) {
        throw new Error("Failed to load razorpay script.")
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subscription?.id,
        name: "Firstcurve",
        description: "Thank you for choosing Firstcurve.",
        image: "/logo.png",
        // currency: 'INR',
        modal: {
          ondismiss: function() {
            
            setIsSubmitting(false)
          }
        },
        handler: async (res) => {
          // update user with subscription id
          const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
          } = res
          try {
            setIsSubmitting(true)
            await supabase
              .from("profiles")
              .update({
                subscription_status: "active",
              })
              .eq("id", user.id)
              .select()
              .single()
            router.push("/dashboard")
          } catch (error) {
            console.error("Error updating subscription status:", error)
            toast.error("Subscription update failed")
          } finally {
            setIsSubmitting(false)
          }
        },
      }

      const rzp1 = new window.Razorpay(options)
      await rzp1.open()
    } catch (error) {
      console.error("Error creating subscription:", error)
      toast.error("Failed to create subscription", {
        description: error?.message ?? "Something went wrong",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#171717] flex flex-col md:flex-row">
      {/* Left Column - Payment Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col h-svh justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <h1 className="text-3xl font-bold text-[#171717] dark:text-white mb-2">
            Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Complete your subscription by providing your payment details
          </p>

          <Card className="bg-gray-100 dark:bg-gray-800 border-0 mb-8">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#171717] dark:text-white mb-4">
                INR 899
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </div>

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
            onClick={handleCheckoutButton}
            className="w-full h-12 bg-[#171717] hover:bg-[#2a2a2a] text-white dark:bg-primary dark:hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                Processing...
              </span>
            ) : (
              "Continue"
            )}
          </Button>

          <div className="flex items-center justify-center mt-4">
            <Lock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Secure payment powered by Razorpay
            </span>
          </div>
          <div className="text-center mt-6">
            <Button 
              onClick={signOut}
              variant={'link'}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#171717] dark:hover:text-white transition-colors"
            >
              Want to login from another account?
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Image */}
      {/* <div className="hidden md:block w-1/2 bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12"> */}
      <div className="relative h-svh w-1/2 overflow-hidden rounded-lg">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          // height={800}
          // width={800}
        />
      </div>
      {/* </div>
      </div> */}
    </div>
  )
}
