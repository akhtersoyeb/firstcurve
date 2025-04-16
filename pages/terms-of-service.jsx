import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Use</CardTitle>
          <CardDescription>Last updated: April 1, 2023</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Firstcurve (the "Service"), you accept and agree to be bound by the terms and
            provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Description of Service</h2>
          <p>
            Firstcurve provides users with an AI-powered platform to find organic marketing opportunities on Reddit.
            The service includes features such as product search, opportunity rating, and AI-generated reply
            suggestions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Registration and Account</h2>
          <p>
            To access certain features of the Service, you may be required to register for an account. You agree to
            provide accurate, current, and complete information during the registration process and to update such
            information to keep it accurate, current, and complete.
          </p>
          <p className="mt-2">
            You are responsible for safeguarding the password that you use to access the Service and for any activities
            or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination
            of upper and lower case letters, numbers, and symbols) with your account.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">4. Subscription and Payment</h2>
          <p>
            Firstcurve offers a subscription-based service at Rs. 800 INR per month. By subscribing to our service, you agree
            to pay the monthly fee. Payments are processed securely through our payment processors.
          </p>
          <p className="mt-2">
            You can cancel your subscription at any time from your account settings. Upon cancellation, you will
            continue to have access to the service until the end of your current billing period.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">5. User Conduct</h2>
          <p>
            You agree not to use the Service for any purpose that is prohibited by these Terms. You are responsible for
            all of your activity in connection with the Service.
          </p>
          <p className="mt-2">You shall not:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>
              Use the Service for any illegal purpose or in violation of any local, state, national, or international
              law.
            </li>
            <li>
              Violate or encourage others to violate the rights of third parties, including intellectual property
              rights.
            </li>
            <li>
              Post, upload, or distribute any content that is unlawful, defamatory, libelous, inaccurate, or that a
              reasonable person could deem to be objectionable, profane, indecent, pornographic, harassing, threatening,
              embarrassing, hateful, or otherwise inappropriate.
            </li>
            <li>
              Use the Service in any manner that could interfere with, disrupt, negatively affect, or inhibit other
              users from fully enjoying the Service.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of Firstcurve and its licensors. The Service is protected by copyright, trademark, and other laws of both
            the United States and foreign countries.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall Firstcurve, nor its directors, employees, partners, agents, suppliers, or affiliates,
            be liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to
            or use of or inability to access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="mt-2">
            <strong>Email:</strong> sksoyebakhter2003@gmail.com
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

