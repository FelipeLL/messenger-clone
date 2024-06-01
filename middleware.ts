import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { DEFAULT_LOGIN_REDIRECT, apiRoutesPrefix, authRoutes } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiRoutesPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiRoute) {
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return undefined;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/', nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
