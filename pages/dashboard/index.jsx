import RedditMarketingTool from "@/components/reddit-marketing-tool"
import UserNavbar from "@/components/user-navbar"
import { createClient as createClientServer } from "@/lib/supabase/server-props"

// export async function getServerSideProps(context) {
//   const supabase = createClientServer(context)

//   const { data: userData, error: userError } = await supabase.auth.getUser()

//   if (userError || !userData?.user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     }
//   }

//   const { data: profileData, error: profileError } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", userData.user.id)
//     .single()

//   if (profileData?.subscription_id === null) {
//     return {
//       redirect: {
//         destination: "/checkout",
//         permanent: false,
//       },
//     }
//   }

//   if (profileData?.subscription_status === "created") {
//     return {
//       redirect: {
//         destination: "/checkout?complete=false",
//         permanent: false,
//       },
//     }
//   }

//   if (profileData?.subscription_status !== "active") {
//     return {
//       redirect: {
//         destination: "/billing",
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//       user: userData.user,
//       profile: profileData,
//     },
//   }
// }

export default function DashboardIndexPage() {
  return (
    <main>
      <UserNavbar />
      <RedditMarketingTool />
    </main>
  )
}
