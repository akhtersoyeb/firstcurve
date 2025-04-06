import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import UserNavbar from "@/components/user-navbar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Loader, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/component"
import Link from "next/link"

export default function BillingPage() {
  const [isCancelling, setIsCancelling] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState({})
  const supabase = createClient()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error(error)
      }
      setUser(data?.user)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    getSubscriptionDetails()
  }, [])

  async function getSubscriptionDetails() {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/subscriptions/details`)
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? "Something went wrong at server side")
      }
      console.log("data: ", data.data)
      setSubscriptionDetails(data.data)
    } catch (error) {
      console.error("Error cancelling subscription:", error)
      toast.error("Subscription cancellation failed")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCancelButton() {
    setIsCancelling(true)
    try {
      const res = await fetch(`/api/subscriptions/cancel`)
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? "Something went wrong at server side")
      }
      await getSubscriptionDetails()
      toast.success("Subscription cancelled successfully")
    } catch (error) {
      console.error("Error cancelling subscription:", error)
      toast.error("Subscription cancellation failed")
    } finally {
      setIsCancelling(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <UserNavbar />
        <div className="container h-svh mx-auto py-10 pt-20 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </>
    )
  }

  return (
    <>
      <UserNavbar />
      <div className="container mx-auto py-10 pt-20">
        <h1 className="text-3xl font-bold mb-6">Billing Details</h1>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              Manage your subscription and payment details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Monthly Plan</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      INR 899 billed monthly
                    </p>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {subscriptionDetails?.status}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            {subscriptionDetails?.status === "active" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={isCancelling} variant="destructive">
                    {isCancelling ? "Processing..." : "Cancel Subscription"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelButton}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <div>
                <p>Please check {user?.email} to activate your subscription.</p>
                <Link className="underline" href={"/contact-us"}>
                  Contact Us
                </Link>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
