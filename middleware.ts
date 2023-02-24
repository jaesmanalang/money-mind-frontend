import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // get cookie
  console.log('running from middleware...');
  const accessToken = req.cookies.get('accessToken');

  if (
    req.nextUrl.pathname === '/' ||
    req.nextUrl.pathname.startsWith('/expenses')
  ) {
    if (accessToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (['/login', '/register'].includes(req.nextUrl.pathname)) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', req.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
