import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username:{ label: "Username", type: "text" },
                password: {  label: "Password", type: "password" },
            },
            async authorize(credentials){
                try {
                    const res = await fetch("http://localhost:8080/api/db/user/login", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            username: credentials.username,
                            password: credentials.password,
                        }),
                    });

                    const user = await res.json();

                    if (user.token && res.ok) {
                        return {
                            username: credentials.username,
                            token: user.token,
                        };
                    }

                    return null;
                }
                catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    session:  {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/",
    },
});