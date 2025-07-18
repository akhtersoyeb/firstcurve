import PublicLayout from "@/components/layout/public-layout";
import {
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  FinalCTASection,
} from "@/components/page-section/landing";

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      {/* <PricingSection /> */}
      <FinalCTASection />
    </PublicLayout>
  );
}
