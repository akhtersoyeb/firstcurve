import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Laugh, List, Search } from "lucide-react";

function FeaturesSection() {
  return (
    <>
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Grow your micro-saas with Reddit
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Our goal is to help you grow your micro-saas organically on
              reddit.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>AI-Powered Search</CardTitle>
                <CardDescription>
                  With our AI-powered search, you can find the perfect reddit
                  posts and comments to market your micro-saas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <List className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Keyword Generator</CardTitle>
                <CardDescription>
                  We have a built-in keyword generator tool that will help you
                  find the perfect keywords to market your micro-saas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Laugh className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle>Unlimited Products</CardTitle>
                <CardDescription>
                  With our free tier, you can add unlimited products to your
                  account.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-pink-500" />
                </div>
                <CardTitle>AI-Powered Comments</CardTitle>
                <CardDescription>
                  With our AI-powered comments, you can automatically generate
                  comments for your micro-saas on reddit.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export { FeaturesSection };
