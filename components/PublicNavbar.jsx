import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="">Reddit</span>
            <span>Marketer</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/product"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Product
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="p-0">
                  Resources
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/faq">FAQ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/roadmap">Roadmap</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/login">Log in</Link>
          </Button>
          {/* <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button> */}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/product"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={toggleMobileMenu}
            >
              Product
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={toggleMobileMenu}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={toggleMobileMenu}
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={toggleMobileMenu}
            >
              FAQ
            </Link>
            <Link
              href="/roadmap"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={toggleMobileMenu}
            >
              Roadmap
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button
                asChild
                variant="outline"
                className="w-full"
                onClick={toggleMobileMenu}
              >
                <Link href="/login">Log in</Link>
              </Button>
              {/* <Button asChild className="w-full" onClick={toggleMobileMenu}>
                <Link href="/sign-up">Sign Up</Link>
              </Button> */}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default PublicNavbar
