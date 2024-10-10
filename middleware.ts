import { clerkMiddleware, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the private routes
const privateRoutes = ["/(protected)", "/dashboard"];

export default clerkMiddleware((auth, req, evt) => {
  const { userId } = auth();
  const path = req.nextUrl.pathname;

  // Check if the route is private and user is not authenticated
  if (privateRoutes.some((route) => path.startsWith(route)) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

// Keep the existing matcher configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
