import Link from "next/link";
import { createClient } from "@/lib/supabase/server-props";
import { type User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import PublicLayout from "@/components/layout/public-layout";
import {
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  FinalCTASection,
} from "@/components/page-section/landing";

interface HomeProps {
  user: User | null;
}

export default function Home({ user }: HomeProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogoutBtn = async () => {
    await logout();
    router.reload();
  };

  if (!user) {
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

  return (
    <>
      <main className="container mx-auto">
        <ul className="flex flex-col space-y-2">
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Button onClick={handleLogoutBtn}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/signup">Signup</Link>
            </>
          )}
        </ul>
      </main>
    </>
  );
}

// get server side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);
  const { data } = await supabase.auth.getUser();
  const { user } = data;
  return {
    props: { user: user },
  };
}
