import { SwissFranc } from "lucide-react";

function Footer() {
  return (
    <>
      <footer id="contact" className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <SwissFranc className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Firstcurve</span>
              </div>
              <p className="text-muted-foreground">Built with ❤️ from India.</p>
              {/* <div className="flex space-x-4">
                <Button size="icon" variant="ghost">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Instagram className="h-5 w-5" />
                </Button>
              </div> */}
            </div>

            {/* <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div> */}

            <p>
              &copy; {new Date().getFullYear()} Firstcurve. All rights reserved.
            </p>
          </div>

          {/* <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Firstcurve. All rights reserved.
            </p>
          </div> */}
        </div>
      </footer>
    </>
  );
}

export default Footer;
