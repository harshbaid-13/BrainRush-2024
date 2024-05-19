import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export async function middleware(req) {
  if (req.url === `${process.env.NEXT_PUBLIC_BASE_URL}`) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const reqHeader = new Headers(req.headers);
    reqHeader.set("Authorization", token?.email);
    return NextResponse.next({
      request: {
        headers: reqHeader,
      },
    });

    // req.next()
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: [
    "/",
    "/profile",
    "/teams",
    "/teams/(.*)",
    "/api/user",
    "/api/team",
    "/api/team/(.*)",
    "/api/user/(.*)",
  ],
};
