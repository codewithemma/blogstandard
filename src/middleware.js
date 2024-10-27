import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect authenticated users away from /auth/* routes
    if (pathname.startsWith("/auth") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Restrict access to /user/admin/* routes based on roles
    if (pathname.startsWith("/user/admin")) {
      if (token?.role === "superadmin" || token?.role === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Allow unauthenticated access to /auth/* routes
        if (pathname.startsWith("/auth")) {
          return true;
        }

        // Require authentication for other protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/post", "/token-topup"],
};
