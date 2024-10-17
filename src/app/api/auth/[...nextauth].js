import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username:
            }
        })
    ],
    session:  {},
    callbacks: {},
    pages: {
        signIn: "/src/app/login",
    },
});