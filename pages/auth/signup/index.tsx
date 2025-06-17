import SignupForm from "@/components/auth/signup-form";

function SignupPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <SignupForm />
      </div>
    </>
  );
}

export default SignupPage;
