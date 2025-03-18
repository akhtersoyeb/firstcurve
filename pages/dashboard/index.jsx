import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/component';
import { createClient as createClientServer } from '@/lib/supabase/server-props';
import { useRouter } from 'next/router';
import React from 'react'

export async function getServerSideProps(context) {
  const supabase = createClientServer(context)

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: data.user,
    },
  }
}

export default function DashboardIndexPage() {
  const router = useRouter()
  const supabase = createClient()
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/')
      // toast({
      //   title: "Signed out successfully",
      //   description: "You have been signed out of your account."
      // });
    } catch (error) {
      console.error("Error signing out:", error);
      // toast({
      //   title: "Error signing out",
      //   description: error.message,
      //   variant: "destructive"
      // });
    }
  };
  return (
    <div>
      <Button onClick={signOut}>Logout</Button>
    </div>
  )
}
