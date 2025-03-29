import PublicFooter from "@/components/PublicFooter"
import PublicNavbar from "@/components/PublicNavbar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server-props"
import {
  ArrowRight,
  BarChart,
  Search,
  MessageSquare,
  Users,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export async function getServerSideProps(context) {
  const supabase = createClient(context)

  const { data: userData, error: userError } = await supabase.auth.getUser()
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id)
    .single()

  if (userData?.user) {
    return {
      redirect: {
        destination: profileData?.subscription_status === null ? "/checkout" : "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Home = () => {
  return (
    <>
      <PublicNavbar />
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Find Reddit Marketing Opportunities{" "}
                  <span className="">Automatically</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Reddit Marketer uses AI to find highly relevant Reddit posts
                  where you can promote your product or service in a helpful,
                  non-spammy way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="text-md">
                    <Link href="/sign-up">Get Started for Free</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-md group"
                  >
                    <Link href="/product" className="flex items-center">
                      How It Works
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <img
                  src="/placeholder.svg"
                  alt="RedditMarketer Dashboard"
                  className="w-full rounded-lg shadow-2xl border border-border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How Reddit Marketer Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get more customers by finding relevant Reddit conversations
                where your product is the perfect solution
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Search className="h-10 w-10" />}
                title="Discover Opportunities"
                description="Our AI scans Reddit for posts where people are looking for solutions like yours, finding high-intent prospects ready to buy."
                delay={0}
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10" />}
                title="Generate Perfect Responses"
                description="Get AI-crafted response templates that provide value first, positioning your product as the natural solution."
                delay={0.1}
              />
              <FeatureCard
                icon={<BarChart className="h-10 w-10" />}
                title="Track Performance"
                description="Monitor your Reddit marketing efforts with detailed analytics showing engagement and conversion metrics."
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose RedditMarketer?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stop wasting time on ineffective marketing - focus on high-ROI
                opportunities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-y-12 gap-x-20">
              <BenefitItem
                title="Save 10+ Hours Per Week"
                description="Automatically find relevant posts instead of manually searching through subreddits."
                delay={0}
              />
              <BenefitItem
                title="Increase Conversion Rates"
                description="Target people actively looking for solutions, not just browsing."
                delay={0.1}
              />
              <BenefitItem
                title="Build Genuine Relationships"
                description="Provide real value first, turning prospects into loyal customers."
                delay={0.2}
              />
              <BenefitItem
                title="Stay Compliant with Reddit Rules"
                description="Our AI helps you avoid spammy pitches that get accounts banned."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Customers Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="RedditMarketer transformed our marketing strategy. We found highly-relevant leads that actually converted into paying customers."
                author="Sarah Johnson"
                company="TechStartup Inc."
                delay={0}
              />
              <TestimonialCard
                quote="I was skeptical at first, but the ROI speaks for itself. We've seen a 3x increase in conversions from Reddit since using this tool."
                author="Michael Chen"
                company="SaaS Solutions"
                delay={0.1}
              />
              <TestimonialCard
                quote="The AI-generated responses are so good, people think we spent hours crafting personalized answers. Game-changer for our small team."
                author="Jessica Miller"
                company="E-commerce Shop"
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Reddit Marketing?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of businesses finding high-converting leads on
              Reddit without the manual work.
            </p>
            <div>
              <Button asChild size="lg" variant="secondary" className="text-md">
                <Link href="/sign-up">Start for Free</Link>
              </Button>
              <p className="mt-4 text-sm opacity-80">
                No credit card required.
              </p>
            </div>
          </div>
        </section>
      </div>
      <PublicFooter />
    </>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="rounded-lg p-6 bg-card border">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
)

const BenefitItem = ({ title, description }) => (
  <div className="flex gap-4">
    <div className="mt-1">
      <CheckCircle className="h-6 w-6" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
)

const TestimonialCard = ({ quote, author, company }) => (
  <div className="rounded-lg p-6 bg-muted/50 border">
    <p className="italic mb-4">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full flex items-center justify-center">
        <Users className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{company}</p>
      </div>
    </div>
  </div>
)

export default Home
