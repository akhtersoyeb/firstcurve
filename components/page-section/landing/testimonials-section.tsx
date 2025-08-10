import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

function TestimonialsSection() {
  return (
    <>
      <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Loved by myself
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Built with love by a micro-saas founder. Reviewed by myself.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Card className="border-0 shadow-lg w-sm">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">
                  &quot;I built Firstcurve to grow my other micro saas products.
                  It works great and I&apos;m getting more organic traffic from
                  reddit.&quot;
                </blockquote>
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://pbs.twimg.com/profile_images/1885481076925300736/LadhK95N_400x400.jpg"
                    alt="Sooooyeb"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Sooooyeb</div>
                    <div className="text-sm text-muted-foreground">
                      Micro-saas founder
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">
                  "The AI automation features are incredible. Tasks that used to
                  take hours now happen automatically. It's like having an extra
                  team member."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Michael Chen"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">
                      CTO, StartupXYZ
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">
                  "Best investment we've made for our team. The collaboration
                  features keep everyone aligned and the analytics help us make
                  better decisions."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Emily Rodriguez"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-muted-foreground">
                      PM, DesignStudio
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>
    </>
  );
}

export { TestimonialsSection };
