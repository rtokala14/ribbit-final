import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/profile/",
    "/sign-in",
    "/sign-up",
    "/community/*",
    "/post/*",
  ],

  signInUrl: "/sign-in",
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
