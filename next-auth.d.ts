// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string | null
      name?: string | null
      email?: string | null
      image?: string | null
      // createdAt?: string
      provider?: string | null
      createdAt?: Date;
      subscriptionType?: string | null;
    }
  }

   interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    createdAt?: Date
  }
}
