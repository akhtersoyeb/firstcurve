import Link from "next/link"

export default function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Firstcurve
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AI-powered organic marketing for your products and services.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact-us" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground transition-colors">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Firstcurve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

