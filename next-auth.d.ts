import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // 👈 add role to User
  }

  interface Session {
    user: {
      id: string;
      role?: string; // 👈 add role to Session
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string; // 👈 add role to JWT
  }
}
