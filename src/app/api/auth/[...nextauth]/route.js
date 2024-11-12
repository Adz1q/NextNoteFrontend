import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
        providers: [
            CredentialsProvider({
                name: "Credentials",
                credentials: {
                    username: { label: "Username", type: "text" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials) {
                    try {
                        const res = await fetch("http://localhost:8080/api/db/user/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                username: credentials.username,
                                password: credentials.password,
                            }),
                        });

                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }

                        const user = await res.json();

                        if (user.token && res.ok) {
                            return {
                                username: credentials.username,
                                token: user.token,
                            };
                        }

                        return null;
                    } catch (error) {
                        console.error(error);
                        return null;
                    }
                },
            }),
        ],
        session: {
            strategy: "jwt",
        },
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.accessToken = user.token;
                    token.username = user.username;
                }
                return token;
            },
            async session({ session, token }) {
                session.accessToken = token.accessToken;
                session.username = token.username;
                return session;
            },
        },
        pages: {
            signIn: "/login",
            error: "/",
        },
});

export { handler as GET, handler as POST }