import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Zap,
  Shield,
  Clock,
  BarChart3,
  MessageSquare,
  Search,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import PublicNavbar from "@/components/PublicNavbar"
import PublicFooter from "@/components/PublicFooter"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]"></div>
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-purple-50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-50 to-transparent"></div>
          <div className="container mx-auto relative px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="px-3.5 py-1.5 text-sm" variant="secondary">
                Simple Pricing
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                One Plan, For Now
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Due to our recent launch we are only offering BASE plan. Soon we will offer PRO and ENTERPRISE plans too.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Card Section */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-200 rounded-full blur-xl opacity-70"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-200 rounded-full blur-xl opacity-70"></div>

                {/* Pricing Card */}
                <div className="relative z-10 w-full max-w-md rounded-2xl border bg-background p-8 shadow-lg">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <Badge className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-0">
                      Base
                    </Badge>
                  </div>

                  <div className="text-center mb-6 pt-4">
                    <h2 className="text-2xl font-bold">Firstcurve</h2>
                    <p className="text-muted-foreground mt-1">
                      Organic marketing solution
                    </p>
                  </div>

                  <div className="flex items-baseline justify-center mb-6">
                    <span className="text-5xl font-extrabold">INR 800</span>
                    <span className="text-xl font-medium text-muted-foreground ml-2">
                      /month
                    </span>
                  </div>

                  <div className="flex justify-center mb-8">
                    <Link href="/sign-up">
                      <Button size="lg" className="w-full rounded-full h-12">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Search className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          10 Product Searches Per Day
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Find all relevant opportunities
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">AI Opportunity Ratings</p>
                        <p className="text-sm text-muted-foreground">
                          Focus on high-potential leads
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">AI-Generated Replies</p>
                        <p className="text-sm text-muted-foreground">
                          Create authentic responses
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Daily Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Fresh opportunities every day
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Fast Performance</p>
                        <p className="text-sm text-muted-foreground">
                          Get results in seconds
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Priority Support</p>
                        <p className="text-sm text-muted-foreground">
                          Get help when you need it
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t text-center">
                    <p className="text-sm text-muted-foreground">
                      Cancel anytime. No contracts or commitments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">
                What's Included
              </h2>
              <p className="max-w-[600px] text-muted-foreground">
                Everything you need in one simple plan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-background/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold">Smart Discovery</h3>
                    <div className="flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=120&width=200"
                        alt="Smart Discovery"
                        className="rounded-lg h-24 object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Find relevant Reddit posts where your product solves a
                      problem
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold">Opportunity Rating</h3>
                    <div className="flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=120&width=200"
                        alt="Opportunity Rating"
                        className="rounded-lg h-24 object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI-powered scoring to identify high-potential
                      opportunities
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold">AI Replies</h3>
                    <div className="flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=120&width=200"
                        alt="AI Replies"
                        className="rounded-lg h-24 object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Generate authentic responses that naturally promote your
                      product
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[600px] text-muted-foreground">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">Q</span>
                      </div>
                      <h3 className="font-bold">Can I cancel anytime?</h3>
                    </div>
                    <div className="flex items-start gap-2 pl-10">
                      <p className="text-sm text-muted-foreground">
                        Yes, you can cancel your subscription at any time from
                        your account settings with no questions asked.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">Q</span>
                      </div>
                      <h3 className="font-bold">Is there a free trial?</h3>
                    </div>
                    <div className="flex items-start gap-2 pl-10">
                      <p className="text-sm text-muted-foreground">
                        We offer a 7-day money-back guarantee if you're not
                        satisfied with our service.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">Q</span>
                      </div>
                      <h3 className="font-bold">Are there any hidden fees?</h3>
                    </div>
                    <div className="flex items-start gap-2 pl-10">
                      <p className="text-sm text-muted-foreground">
                        No, the $12/month plan includes all features with no
                        additional or hidden costs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">Q</span>
                      </div>
                      <h3 className="font-bold">Do you offer refunds?</h3>
                    </div>
                    <div className="flex items-start gap-2 pl-10">
                      <p className="text-sm text-muted-foreground">
                        Yes, we offer a full refund within 7 days of your
                        initial purchase if you're not satisfied.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-cyan-50"></div>
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]"></div>
          <div className="container mx-auto relative px-4 md:px-6">
            <div className="max-w-3xl mx-auto bg-background rounded-2xl p-8 shadow-lg border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter">
                    Ready to Get Started?
                  </h2>
                  <p className="text-muted-foreground">
                    Join Firstcurve today and start finding organic marketing
                    opportunities.
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      No credit card required.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold">$12</div>
                    <div className="text-sm text-muted-foreground">
                      per month
                    </div>
                  </div>
                  <Link href="/sign-up">
                    <Button size="lg" className="rounded-full px-8">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      <PublicFooter />
    </div>
  )
}
