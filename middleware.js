export { default } from "next-auth/middleware";

export const config = { matcher: ["/profile", "/teams", "/api/textreq"] };
// export const config = { matcher: ["/api/textreq"] };
