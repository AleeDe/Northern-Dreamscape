import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // bookings role — only /admin/bookings allowed
    if (token?.role === 'bookings' && !pathname.startsWith('/admin/bookings')) {
      return NextResponse.redirect(new URL('/admin/bookings', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/admin/((?!login).*)'],
}
