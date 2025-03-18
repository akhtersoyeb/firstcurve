import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer
      className="border-t py-12 bg-muted/20"
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/product"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/roadmap"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Roadmap
              </Link>
            </li>
            <li>
              <Link
                href="/feedback"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 pt-8 border-t text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} RedditMarketer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
