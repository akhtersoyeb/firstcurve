import { createClient } from "@/lib/supabase/component"

export default function useAuth() {
  const supabase = createClient()

  async function signupWithEmail({email, password} : {email: string, password: string}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return data
  }

  async function loginWithEmail({email, password} : {email: string, password: string}) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return data
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  }

  return {
    signupWithEmail,
    loginWithEmail,
    logout,
  }
}
