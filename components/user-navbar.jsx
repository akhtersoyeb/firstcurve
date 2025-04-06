import Link from "next/link"
import { useRouter } from "next/router"
import { createClient } from "@/lib/supabase/component"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export default function UserNavbar() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error(error)
      }
      setUser(data?.user)
    }
    fetchUser()
  }, [])

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
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-5 px-6">
      <div className="mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Firstcurve
            </span>
          </Link>
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {user?.email.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild>
                {/* <Link href={"/profile"}>Profile</Link> */}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/billing"}>Billing</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem asChild>
                <Link href={"/contact-us"}>Contact Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
