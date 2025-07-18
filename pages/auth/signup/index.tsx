import SignupForm from "@/components/auth/signup-form";
import PublicLayout from "@/components/layout/public-layout";
import { createClient } from "@/lib/supabase/server-props";
import { GetServerSidePropsContext } from "next";

export default function SignupPage() {
  return (
    <>
      <PublicLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)]">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <SignupForm />
        </div>
      </PublicLayout>
    </>
  );
}

// get server side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);
  const { data } = await supabase.auth.getUser();
  const { user } = data;
  // If user is already logged in, redirect to home page
  if (user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If user is not logged in, proceed to show signup page
  return {
    props: {},
  };
}
