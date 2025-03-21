import RedditMarketingTool from "@/components/reddit-marketing-tool"
import { createClient as createClientServer } from "@/lib/supabase/server-props"

export async function getServerSideProps(context) {
  const supabase = createClientServer(context)

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return {
      redirect: {
        destination: "/",
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
  return (
    <main>
      <RedditMarketingTool />
    </main>
  )
}
