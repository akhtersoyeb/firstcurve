import AppLayout from "@/components/layout/app-layout";
import CreatedProductsSection from "@/components/page-section/dashboard/created-products-section";
import SearchForm from "@/components/product/search-form";
import { createClient } from "@/lib/supabase/server-props";
import { GetServerSidePropsContext } from "next";

export default function DashboardIndexPage() {
  return (
    <>
      <AppLayout>
        <div className="min-h-screen w-full bg-[#f8fafc] relative pb-10">
          {/* Bottom Fade Grid Background */}
          <div
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
              `,
              backgroundSize: "20px 30px",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
            }}
          />
          <main className="relative">
            <div className="container mx-auto h-[calc(100vh-300px)] px-4 md:px-6 flex flex-col justify-center items-center">
              <SearchForm />
            </div>

            <div className="bg-white backdrop-blur-3xl container mx-auto rounded-md">
              <CreatedProductsSection />
            </div>
          </main>
        </div>
      </AppLayout>
    </>
  );
}

// get server side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);
  const { data } = await supabase.auth.getUser();
  const { user } = data;
  // If user is not logged in, redirect to login page
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  // If user is logged in, proceed to show dashboard page
  return {
    props: {},
  };
}
