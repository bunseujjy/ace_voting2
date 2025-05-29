// app/api/auth/[...nextauth]/route.ts (or route.js depending on your setup)
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Admin credentials
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_HASHED_PASSWORD =
  "$2b$10$RagbdLOjEDAEGBhhNqgIEe8zo.AyJ.F3HBbJqqXbCXPF6JipqTW96"; // Replace with your own hashed password

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (email !== ADMIN_EMAIL) {
          throw new Error("Unauthorized email");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          ADMIN_HASHED_PASSWORD
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: "admin-id", name: "Admin", email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
