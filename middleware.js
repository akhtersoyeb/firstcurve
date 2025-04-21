import { NextResponse } from "next/server";
import createClient from "./lib/supabase/middleware";

// Define page groups for easier management
const OPEN_FOR_ALL_ROUTES = [
  "/privacy-policy",
  "/refund-policy",
  "/terms-of-service",
  "/error",
  "/contact-us",
  "/blog",
  "/pricing",
];

const UNAUTH_ONLY_ROUTES = ["/login", "/sign-up"];

const ACTIVE_SUBSCRIPTION_ROUTES = ["/dashboard"];

const ANY_SUBSCRIPTION_ROUTES = [
  ...ACTIVE_SUBSCRIPTION_ROUTES,
  "/billing",
  "/profile",
];

const AUTH_ONLY_ROUTES = [...ANY_SUBSCRIPTION_ROUTES, "/checkout"];

export async function middleware(req) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;
  const supabase = createClient(req, res);

  // CASE 1: Open for all routes
  if (OPEN_FOR_ALL_ROUTES.some((route) => pathname.startsWith(route))) {
    return res;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // CASE 2: Only unauthenticated users can access these routes
  if (UNAUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route)) && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // CASE 3: Authenticated users can access these routes
  if (AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route)) && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("subscription_status", "subscription_id")
    .eq("id", user?.id)
    .single();

  // SPECIAL CASE: User has subscription but is on checkout page
  if (
    pathname.startsWith("/checkout") &&
    profileData?.subscription_status
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // CASE 4: Authenticated and with any subscription only routes
  if (
    ANY_SUBSCRIPTION_ROUTES.some((route) => pathname.startsWith(route)) &&
    user
  ) {
    if (!profileData?.subscription_status && !profileData?.subscription_id) {
      return NextResponse.redirect(new URL("/checkout", req.url));
    }
  }

  // CASE 5: Authenticated and active subscription only routes
  if (
    ACTIVE_SUBSCRIPTION_ROUTES.some((route) => pathname.startsWith(route)) &&
    user
  ) {
    if (
      profileData?.subscription_status !== "active"
    ) {
      return NextResponse.redirect(new URL("/billing", req.url));
    }
  }

  return res;
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
