import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin';
import { connectToDatabase } from './lib/mongodb';


export const { auth, signIn, signOut  , handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email().min(6), password: z.string().min(6) })
          .safeParse(credentials);

          if (parsedCredentials.success) {
          await connectToDatabase()
          const { email, password } = parsedCredentials.data;
          const user = await Admin.findOne({ email });
          if (!user) return null;
          if (user.emailVerified === false) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
          }
          return null;
      },
    }),
  ],
  callbacks: {
    // JWT callback: Add custom properties to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    
    // Session callback: Add custom properties to the session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    
  },
});