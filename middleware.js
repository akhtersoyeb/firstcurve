import { NextResponse } from 'next/server'
import createClient from './lib/supabase/middleware'


export async function middleware(req) {
  const res = NextResponse.next()
  // Create a Supabase client using the newer @supabase/ssr package
  const supabase = createClient(req)
  
  // Check if user is authenticated
  const {
    data: session,
  } = await supabase.auth.getUser()
  
  // Get the pathname from the URL
  const { pathname } = req.nextUrl
  
  // Define private routes that require authentication
  const privateRoutes = ['/dashboard', '/checkout', '/profile', '/billing']
  
  // Define routes that require subscription check
  const subscriptionRoutes = ['/dashboard']

  // Define routes that only un-authenticated users can access
  const unauthenticatedRoutes = ['/login', '/sign-up']

  // Redirect to dashboard if authenticated users are on routes for only unauthenticated users
  if (unauthenticatedRoutes.includes(pathname) && session?.user) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  
  // Redirect to login if accessing private route without authentication
  if (privateRoutes.includes(pathname) && !session?.user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // For subscription-specific routes, check subscription tier
  if (subscriptionRoutes.includes(pathname) && session?.user) {
    // Fetch additional user data including subscription info
    const { data: profileData } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', session.user.id)
      .single()
    
    // Redirect if subscription check fails
    if (pathname !== '/checkout' && (!profileData?.subscription_status || profileData?.subscription_status === 'created')) {
      return NextResponse.redirect(new URL('/checkout', req.url))
    }

    if (profileData.subscription_status !== 'active' && pathname !== '/billing') {
      return NextResponse.redirect(new URL('/billing', req.url))
    }
  }
  
  return res
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    // un-authenticated only routes 
    '/login',
    '/sign-up',
    // authenticated only routes
    '/dashboard/:path*',
    '/checkout/:path*',
    '/profile/:path*',
    '/billing/:path*'
  ],
}