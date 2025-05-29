import { authenticatedUser } from "@/lib/amplify-server-util";
import { type NextRequest, NextResponse } from "next/server";
import { AllRoutesEnum } from "@/lib/enums";

export async function middleware(request: NextRequest) {
  const {
    DASHBOARD,
    LOGIN,
    SIGNUP,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    CONFIRM_SIGNUP,
    ACCOUNT_MANAGEMENT,
    FILE_UPLOAD,
    PREDICTIONS,
    INSIGHTS,
    LOGGING_SYSTEM,
    TEMPLATES,
    SUPPORT,
  } = AllRoutesEnum;

  const response = NextResponse.next();

  try {
    const user = await authenticatedUser({ request, response });
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;

    // Special handling for confirm signup page
    if (pathname === CONFIRM_SIGNUP) {
      const email = searchParams.get("email");
      if (!email) {
        return NextResponse.redirect(new URL(LOGIN, request.nextUrl));
      }
    }

    // Define auth routes that should redirect to dashboard if user is authenticated
    const authRoutes = [
      LOGIN,
      SIGNUP,
      FORGOT_PASSWORD,
      RESET_PASSWORD,
      CONFIRM_SIGNUP,
    ];
    const isAuthRoute = authRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    // If user is authenticated and trying to access an auth route, redirect to dashboard
    if (user && isAuthRoute) {
      return NextResponse.redirect(new URL(DASHBOARD, request.nextUrl));
    }

    // Define protected routes that require authentication
    const protectedRoutes = [
      DASHBOARD,
      ACCOUNT_MANAGEMENT,
      FILE_UPLOAD,
      PREDICTIONS,
      INSIGHTS,
      LOGGING_SYSTEM,
      TEMPLATES,
      SUPPORT,
      "/molecule",
      "/prediction",
      "/loging-detail",
    ];

    // Check if user is trying to access a protected route without authentication
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL(LOGIN, request.nextUrl));
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL(LOGIN, request.nextUrl));
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
