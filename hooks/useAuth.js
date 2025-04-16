import { createClient } from "@/lib/supabase/component";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

export default function useAuth() {
  const router = useRouter();
  const supabase = createClient();

  async function signUpWithEmail({ email, password }) {
    return await supabase.auth.signUp({
      email,
      password,
    })
  }

  async function signInWithEmail({ email, password }) {
    return await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  async function signInWithGoogle() {
    const origin = window.location.origin
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/api/auth/callback/google`,
      },
    });
  }

  const signUpWithEmailMutation = useMutation({
    mutationFn: ({ email, password }) => signUpWithEmail({ email, password }),
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.error.message, {
          description: "Failed to signup",
        });
        return;
      }
      if (res?.data?.user) {
        toast.success("Signup successful.");
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      toast.error("Error while signup.", {
        description:
          error?.message ?? "Something went wrong. Please try again later.",
      });
      return;
    },
  });

  const signInWithGoogleMutation = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.error.message, {
          description: "Failed to login",
        });
        return;
      }
    },
    onError: (error) => {
      console.log('error: ', error)
      toast.error("Error while login.", {
        description:
          error?.message ?? "Something went wrong. Please try again later.",
      });
      return;
    },
  });

  const signInWithEmailMutation = useMutation({
    mutationFn: ({ email, password }) => signInWithEmail({ email, password }),
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.error.message, {
          description: "Failed to login",
        });
        return;
      }
      if (res?.data?.user) {
        toast.success("Login successful.");
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      toast.error("Error while login.", {
        description:
          error?.message ?? "Something went wrong. Please try again later.",
      });
      return;
    },
  });

  return {
    signUpWithEmailMutation,
    signInWithEmailMutation,
    signInWithGoogleMutation
  };
}
