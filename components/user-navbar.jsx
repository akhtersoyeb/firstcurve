import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";

export default function UserNavbar() {
  const { signOutMutation, userQuery } = useAuth();

  const billingUrl =
    process.env.NODE_ENV === "development"
      ? `https://test.customer.dodopayments.com/login/bus_Pu24PPCJufCfoljmKe8QT`
      : `https://customer.dodopayments.com/login/bus_Pu24PPCJufCfoljmKe8QT`;

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
                <AvatarImage src={userQuery?.data?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {userQuery?.data?.email.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild>
                <Link href={billingUrl}>Billing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/contact-us"}>Contact Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => await signOutMutation.mutateAsync()}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
