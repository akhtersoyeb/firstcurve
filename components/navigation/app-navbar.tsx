import {
  CircleUser,
  LogOut,
  Mail,
  MessageCircleQuestion,
  SwissFranc,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/queries/users";
import useAuth from "@/hooks/useAuth";

export default function AppNavbar() {
  const user = useUser();
  const { logout } = useAuth();
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <SwissFranc className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Firstcurve</span>
          </div>
          <div className="flex items-center space-x-4">
            {user.data?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer focus:outline-none">
                  <CircleUser />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    {user.data.user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <MessageCircleQuestion />
                    Contact Support
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
