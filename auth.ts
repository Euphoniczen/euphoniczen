import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"

import Spotify from "next-auth/providers/spotify"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"


 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session, user }) {
      const accounts = await prisma.account.findMany({
        where: {userId: user.id},
        select: {provider: true},
      })
      session.user.id = user.id;
      session.user.createdAt = user.createdAt
      session.user.provider = accounts[0]?.provider ?? null

        // adding subscription type to my auth //
        try {
          const subscription = await prisma.subscriptionData.findFirst({
            where: {
              subscriberEmail: session.user.email!,
            },
            select: {
              subscriptionName: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
  
          if (subscription?.subscriptionName) {
            session.user.subscriptionType = subscription.subscriptionName;
          }
        } catch (error) {
          console.error("Failed to fetch subscription type in session callback:", error);
        }

      return session
    }
  }
})