import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

function FinalCTASection() {
  return (
    <>
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to grow your micro-saas?
            </h2>
            <p className="text-xl opacity-90">
              Join early beta and get 100% organic traffic to your micro-saas
              from reddit for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "text-lg px-8"
                )}
              >
                Start For Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/auth/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                )}
              >
                Login
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>Early beta access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { FinalCTASection };
