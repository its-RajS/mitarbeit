import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from './src/lib/supabase/auth/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  /* -------------------- Protected routes -------------------- */
  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  /* -------------------- Email link error handling -------------------- */
  const emailLinkError = 'Email link is invalid or has expired'

  if (
    req.nextUrl.searchParams.get('error_description') === emailLinkError &&
    pathname !== '/signup'
  ) {
    return NextResponse.redirect(
      new URL(
        `/signup?error_description=${encodeURIComponent(emailLinkError)}`,
        req.url
      )
    )
  }

  /* -------------------- Auth pages redirect -------------------- */
  if (['/login', '/signup'].includes(pathname) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}
