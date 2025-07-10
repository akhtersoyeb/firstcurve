import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

function HeroSection() {
  return (
    <>
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 New: AI-Powered Search
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Reach Reddit
                  <span className="text-primary"> Audience</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  Find the perfect reddit posts and comments to market your
                  micro-saas and more.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/signup"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "default" }),
                    "text-lg px-8"
                  )}
                >
                  Start for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/auth/login"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "text-lg px-8 bg-transparent"
                  )}
                >
                  Login
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Early beta access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <Image
                src="/hero-image.png"
                alt="StreamLine Dashboard"
                width={800}
                height={800}
                className="relative rounded-2xl shadow-2xl border"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { HeroSection };
