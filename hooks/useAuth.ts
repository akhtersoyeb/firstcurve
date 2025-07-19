import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/router";

export default function useAuth() {
  const router = useRouter();
  const supabase = createClient();

  async function signupWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async function loginWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    router.push("/");
  }

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return data;
  }

  return {
    signupWithEmail,
    loginWithEmail,
    logout,
    getUser,
  };
}
