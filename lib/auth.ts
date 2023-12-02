import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./db/prisma";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { env } from "./env";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session, user }) {
            session.user!.id = user.id;

            session.user!.status = "User";

            const isAdmin = env.ADMIN_EMAILS.includes(user.email);

            if (isAdmin) {
                session.user!.status = "Admin";

                await prisma.user.update({
                    where: { id: user.id },
                    data: { status: session.user!.status },
                });
            } else (
                await prisma.user.update({
                    where: { id: user.id },
                    data: { status: session.user!.status },
                })
            )

            return session;
        },
    },
    pages: {
        signIn: '/sign-in'
    }
}