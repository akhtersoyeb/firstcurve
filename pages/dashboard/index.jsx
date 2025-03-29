import RedditMarketingTool from "@/components/reddit-marketing-tool"
import { createClient as createClientServer } from "@/lib/supabase/server-props"

export async function getServerSideProps(context) {
  const supabase = createClientServer(context)

  const { data: userData, error: userError } = await supabase.auth.getUser()
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id)
    .single()

  if (userError || !userData?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  if (profileData?.subscription_id === null) {
    return {
      redirect: {
        destination: "/checkout",
        permanent: false,
      },
    }
  }

  if (profileData?.subscription_status === 'created') {
    return {
      redirect: {
        destination: "/checkout?complete=false",
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: userData.user,
      profile: profileData
    },
  }
}

export default function DashboardIndexPage({user,profile}) {
  return (
    <main>
      <RedditMarketingTool />
    </main>
  )
}
