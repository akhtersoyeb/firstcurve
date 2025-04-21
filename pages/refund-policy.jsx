import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function RefundPolicyPage() {
  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Refund Policy</CardTitle>
          <CardDescription>Last updated: April 9, 2025</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary mt-0 mb-2">7-Day Money-Back Guarantee</h2>
            <p className="mb-0">
              We're confident you'll love Firstcurve. If you're not completely satisfied with our service, we offer a
              full refund within 7 days of your initial purchase.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Refund Eligibility</h2>
          <p>
            Firstcurve offers a 7-day money-back guarantee on all new subscriptions. If you're not satisfied with our
            service for any reason, you can request a full refund within 7 days of your initial purchase.
          </p>
          <p>To be eligible for a refund:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Your request must be made within 7 days of your initial subscription purchase</li>
            <li>Your account must be in good standing</li>
            <li>You must submit your request through our Contact Us page</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. How to Request a Refund</h2>
          <p>To request a refund, please follow these steps:</p>
          <ol className="list-decimal pl-6 my-4 space-y-2">
            <li>
              Visit our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>{" "}
              page
            </li>
            <li>Fill out the contact form with the subject line "Refund Request"</li>
            <li>Include your account email address and the date of your subscription purchase</li>
            <li>Briefly explain why you're requesting a refund (this helps us improve our service)</li>
          </ol>
          <p>
            Our support team will process your refund request within 2 business days. You'll receive an email
            confirmation once your refund has been processed.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Refund Processing</h2>
          <p>
            Refunds will be issued to the original payment method used for the purchase. Depending on your payment
            provider, it may take 5-10 business days for the refund to appear in your account.
          </p>
          <p>Please note:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>We do not provide partial refunds for unused portions of a subscription period</li>
            <li>
              Refunds are only available for the current billing cycle and cannot be applied to previous billing cycles
            </li>
            <li>
              If you've received a refund, your account access will be terminated at the time the refund is processed
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">4. Exceptions</h2>
          <p>The following situations are not eligible for our standard refund policy:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Requests made after the 7-day period has expired</li>
            <li>Accounts that have violated our Terms of Service</li>
            <li>Subscription renewals (the 7-day period applies only to initial purchases)</li>
            <li>Accounts that have previously received a refund</li>
          </ul>
          <p>
            In exceptional circumstances, we may consider refund requests that fall outside these guidelines. Please
            contact our support team to discuss your specific situation.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon
            posting to our website. Your continued use of our service after any changes indicates your acceptance of the
            updated refund policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about our refund policy, please don't hesitate to contact us at{" "}
            <a href="mailto:sksoyebakhter2003@gmail.com" className="text-primary hover:underline">
              sksoyebakhter2003@gmail.com
            </a>{" "}
            or through our Contact Us page.
          </p>

          <div className="mt-10 border-t pt-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4">Need to request a refund?</h3>
            <Link href="/contact-us">
              <Button className="flex items-center gap-2">
                Go to Contact Page <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
