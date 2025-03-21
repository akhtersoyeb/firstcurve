import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/router"
import { createClient } from "@/lib/supabase/component"

export default function UserNavbar() {
  const router = useRouter()
  const supabase = createClient()
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
      // toast({
      //   title: "Signed out successfully",
      //   description: "You have been signed out of your account."
      // });
    } catch (error) {
      console.error("Error signing out:", error)
      // toast({
      //   title: "Error signing out",
      //   description: error.message,
      //   variant: "destructive"
      // });
    }
  }
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#171717] z-50 px-4 md:px-6">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-[#171717] dark:text-white" />
          <span className="font-semibold text-lg text-[#171717] dark:text-white">
            RedditPro
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {["Pricing", "Features", "Blogs", "More"].map((item) => (
            <Link
              key={item}
              href="#"
              className={cn(
                "text-sm font-medium text-gray-600 hover:text-[#171717]",
                "dark:text-gray-300 dark:hover:text-white transition-colors"
              )}
            >
              {item}
            </Link>
          ))}
        </nav>

        <Button
          onClick={signOut}
          variant="outline"
          className="border-gray-300 text-[#171717] hover:bg-gray-100 hover:text-[#171717] dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
