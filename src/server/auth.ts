import DiscordProvider from "next-auth/providers/discord";
import { type NextAuthOptions, type Session, type User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

// Extend the session type to include the `id` on `user`
declare module "next-auth" {
  interface Session {
    user: {
      id: string;  // Add id to the user object
    } & DefaultSession["user"];  // Include default properties
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    // Add EmailProvider or other providers for verification if needed
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER!,
    //   from: process.env.EMAIL_FROM!,
    // }),
  ],
  callbacks: {
    // Session callback
    session: async ({ session, token }: { session: Session; token: JWT }) => {
       if (session.user && session.user && token.sub) {session.user.id = token.sub ?? ""}
      return session;
    },
    // JWT callback
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      // If it's the initial sign-in, attach the user ID to the token
      if (user) {
        token.sub = user.id;
        // Optional: Add any other user-related fields like roles
        token.emailVerified = user.email
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // Use JWT sessions
  },
  // Optional: Add verification logic for email providers
  // pages: {
  //   verifyRequest: '/auth/verify-request', // Email verification page (used by email provider)
  // },
};
