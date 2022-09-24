import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@server/infra/views/utils/client";
import { env } from "@env/server.mjs";
import { RoutePaths } from "@interfaces/routes";

export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, user }) {
            if (session.user) session.user.id = user.id;
            return session;
        },
    },
    pages: {
        signIn: RoutePaths.LOGIN,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};

export default NextAuth(authOptions);
