import AppLayout from "@/components/layout/app-layout";
import SearchForm from "@/components/product/search-form";
import { createClient } from "@/lib/supabase/server-props";
import { GetServerSidePropsContext } from "next";

export default function DashboardIndexPage() {
  return (
    <>
      <AppLayout>
        <main className="container mx-auto min-h-screen flex flex-col justify-center items-center">
          <SearchForm />
        </main>
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
