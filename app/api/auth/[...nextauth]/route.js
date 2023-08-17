import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDatabase();
        const sessionUser = await User.findOne({ email: session?.user?.email });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();
        //if user already exists
        const userExists = await User.findOne({ email: profile.email });
        //create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            name: profile.name,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            department: "",
            year: "",
            phoneNumber: "1234567890",
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
