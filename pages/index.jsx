import { Marquee } from "@/components/magicui/marquee"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Safari } from "@/components/magicui/safari"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { WordRotate } from "@/components/magicui/word-rotate"
import PublicFooter from "@/components/PublicFooter"
import PublicNavbar from "@/components/PublicNavbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server-props"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  BarChart,
  Search,
  MessageSquare,
  Users,
  CheckCircle,
  ChevronRight,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export async function getServerSideProps(context) {
  const supabase = createClient(context)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (user) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function LandingPage() {
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ]

  const reviews = [
    {
      name: "SK",
      username: "Chrome Extension Dev",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "Browser Extension Dev",
      body: "Reddit is where users live. Thanks for automating the process.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "Probli",
      username: "Founder",
      body: "Saved me daily hours of labour",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Amil",
      username: "Engineer | Founder",
      body: "I am using it on a daily basis",
      img: "https://avatar.vercel.sh/jane",
    },
  ]

  // const firstRow = reviews.slice(0, reviews.length / 2)
  // const secondRow = reviews.slice(reviews.length / 2)

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <div className="flex flex-col min-h-screen">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-purple-50 to-cyan-50">
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]"></div>
            <div className="container mx-auto px-4 md:px-6 relative">
              <div className="grid grid-cols-1 gap-12 items-center">
                <div className="flex flex-col items-center space-y-6">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit">
                    New Feature: AI-Generated Replies
                  </div>
                  <div className="space-y-4">
                    <h1 className="flex flex-col space-x-4 lg:flex-row items-center justify-center text-4xl text-center font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl/none">
                      <WordRotate
                        className="text-4xl font-bold text-black dark:text-white sm:text-5xl md:text-6xl lg:text-6xl/none"
                        words={["Organic", "Active", "Reddit"]}
                      />
                      Marketing with
                      {/* <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent"> */}
                      <span className="ml-4">
                        <SparklesText text="AI" />
                      </span>
                      {/* </span> */}
                    </h1>
                    <p className="text-center text-muted-foreground md:text-xl">
                      Find the perfect opportunities to market your product on
                      Reddit with our AI-powered platform.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/sign-up">
                      <Button size="lg" className="h-9 px-8 rounded-full">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="#how-it-works">
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-9 px-8 rounded-full"
                      >
                        How It Works
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex -space-x-2">
                      {avatars.map((item, index) => (
                        <Avatar key={index}>
                          <AvatarImage src={item.imageUrl} />
                          <AvatarFallback>R</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium text-foreground">200+</span>{" "}
                      sign ups in just 3 days
                    </div>
                  </div>
                </div>
                <div className="mx-auto">
                  <Safari
                    mode="default"
                    imageSrc={"/1200x700.png"}
                    url="firstcurve.in"
                    className="size-full"
                    width={1200}
                    height={800}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Brands Section */}
          <section className="py-12 border-y bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <NumberTicker
                  value={231}
                  className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white"
                />
                <p className="text-sm text-muted-foreground">
                  TRUSTED BY 200+ HAPPY MARKETERS
                </p>
                <div className="flex -space-x-2">
                  {avatars.map((item, index) => (
                    <Avatar key={index}>
                      <AvatarImage src={item.imageUrl} />
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {/* <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
                  <img
                    src="/placeholder.svg?height=40&width=120"
                    alt="Brand logo"
                    className="h-8 opacity-70 grayscale"
                  />
                  <img
                    src="/placeholder.svg?height=40&width=120"
                    alt="Brand logo"
                    className="h-8 opacity-70 grayscale"
                  />
                  <img
                    src="/placeholder.svg?height=40&width=120"
                    alt="Brand logo"
                    className="h-8 opacity-70 grayscale"
                  />
                  <img
                    src="/placeholder.svg?height=40&width=120"
                    alt="Brand logo"
                    className="h-8 opacity-70 grayscale"
                  />
                  <img
                    src="/placeholder.svg?height=40&width=120"
                    alt="Brand logo"
                    className="h-8 opacity-70 grayscale"
                  />
                </div> */}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground w-fit">
                  POWERFUL FEATURES
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    AI-Powered Marketing Tools
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                    Our platform helps you find and engage with potential
                    customers organically.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative flex flex-col h-full p-6 bg-background rounded-xl border shadow-sm">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Smart Discovery</h3>
                    <p className="text-muted-foreground mb-4">
                      Our AI finds Reddit posts where your product can be a
                      perfect solution.
                    </p>
                    <div className="mt-auto pt-4 border-t">
                      <div className="flex items-center text-sm text-primary font-medium">
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative flex flex-col h-full p-6 bg-background rounded-xl border shadow-sm">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Opportunity Rating
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Each post is rated by our AI to help you focus on the best
                      opportunities.
                    </p>
                    <div className="mt-auto pt-4 border-t">
                      <div className="flex items-center text-sm text-primary font-medium">
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative flex flex-col h-full p-6 bg-background rounded-xl border shadow-sm">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      AI-Generated Replies
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Generate authentic, helpful responses that naturally
                      promote your product.
                    </p>
                    <div className="mt-auto pt-4 border-t">
                      <div className="flex items-center text-sm text-primary font-medium">
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Product Demo Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-25"></div>
                    <div className="relative rounded-xl overflow-hidden border shadow-xl">
                      <img
                        src="/placeholder.svg?height=600&width=800"
                        alt="Product Demo"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 flex flex-col space-y-6">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground w-fit">
                    PRODUCT SHOWCASE
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    See Firstcurve in Action
                  </h2>
                  <p className="text-muted-foreground">
                    Our intuitive interface makes it easy to find and engage
                    with potential customers on Reddit.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Discover relevant posts</p>
                        <p className="text-sm text-muted-foreground">
                          Find discussions where your product solves a problem
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          AI-powered opportunity scoring
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Focus on posts with the highest conversion potential
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Generate authentic responses
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Create helpful replies that naturally promote your
                          product
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/sign-up">
                      <Button size="lg" className="">
                        Try It
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground w-fit">
                  HOW IT WORKS
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Three Simple Steps
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                    Start marketing your product organically in minutes
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-lg opacity-25"></div>
                    {/* <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                      1
                    </div> */}
                  </div>
                  <div className="bg-muted/30 rounded-xl p-6 border relative h-full">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-background rounded-xl border shadow-md p-2">
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                        1
                      </div>
                      {/* <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="Input Product"
                        className="w-16 h-16 object-cover"
                      /> */}
                    </div>
                    <div className="pt-8">
                      <h3 className="text-xl font-bold mb-2">
                        Input Your Product
                      </h3>
                      <p className="text-muted-foreground">
                        Enter your product name and description to help our AI
                        understand what you're marketing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-lg opacity-25"></div>
                    {/* <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                      2
                    </div> */}
                  </div>
                  <div className="bg-muted/30 rounded-xl p-6 border relative h-full">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-background rounded-xl border shadow-md p-2">
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                        2
                      </div>
                      {/* <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="Discover Opportunities"
                        className="w-16 h-16 object-cover"
                      /> */}
                    </div>
                    <div className="pt-8">
                      <h3 className="text-xl font-bold mb-2">
                        Discover Opportunities
                      </h3>
                      <p className="text-muted-foreground">
                        Our AI scans Reddit to find posts where your product can
                        be a solution and rates each opportunity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-lg opacity-25"></div>
                    {/* <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                      3
                    </div> */}
                  </div>
                  <div className="bg-muted/30 rounded-xl p-6 border relative h-full">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-background rounded-xl border shadow-md p-2">
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                        3
                      </div>
                      {/* <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="Engage Naturally"
                        className="w-16 h-16 object-cover"
                      /> */}
                    </div>
                    <div className="pt-8">
                      <h3 className="text-xl font-bold mb-2">
                        Engage Naturally
                      </h3>
                      <p className="text-muted-foreground">
                        Use our AI to generate authentic replies or craft your
                        own to engage with potential customers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-muted/30">
            <div className=" mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground w-fit">
                  TESTIMONIALS
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    What Our Users Say
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                    Hear from businesses that have grown with Firstcurve
                  </p>
                </div>
              </div>

              {/* <div className=""> */}
              <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                
                <Marquee className="[--duration:20s]">
                  {reviews.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
              </div>
              {/* <div className="bg-background rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Sarah Johnson"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">
                        Founder, TechGadgets
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-amber-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Firstcurve AI helped us find the perfect audience for our
                    product. The AI-generated replies saved us hours of work."
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Sarah Johnson"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">
                        Founder, TechGadgets
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-amber-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Firstcurve AI helped us find the perfect audience for our
                    product. The AI-generated replies saved us hours of work."
                  </p>
                </div>
                <div className="bg-background rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Sarah Johnson"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">
                        Founder, TechGadgets
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-amber-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Firstcurve AI helped us find the perfect audience for our
                    product. The AI-generated replies saved us hours of work."
                  </p>
                </div> */}
            </div>
            {/* </div> */}
          </section>
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}
