import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db, models } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

import { User, getServerSession } from "next-auth";

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  return session;
};

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  // if (!authUserSession) throw new Error('unauthorized')
  return authUserSession?.user;
};

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  debug: true,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No Profile");
      }
      await db
        .insert(models.users)
        .values({ email: String(profile.email), password: "****", name: String(profile.name) })
        .onConflictDoUpdate({ target: models.users.email, set: { name: profile.name } });
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/me";
    },
    session,
    async jwt({ token, user, account, profile }) {
      if (profile) {
        const user = await db.query.users.findFirst({ where: eq(models.users.email, String(profile.email)) });

        if (!user) {
          throw new Error("No user found");
        }
        token.id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
