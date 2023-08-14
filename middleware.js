export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/profile",
    "/teams",
    "/teams/(.*)",
    "/api/team/(.*)",
    "/api/user/(.*)",
  ],
};
