"use client"

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useFormState } from 'react-dom';
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {

    const { data: session } = useSession();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [state, formSubmit] = useFormState(handleSubmit, undefined);

    const router = useRouter();

    useEffect(() => {
        if(session?.username) {
            router.push("/");
        }
    });

    async function handleSubmit(previousState, event) {
        event.preventDefault();

        try {
            const result = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if(!result || !result.ok) {
                throw { error: "Invalid username or password!" };
            }

            router.push("/");
        }
        catch (error) {
            return error;
        }
    }

    return (
        <div className="flex flex-col gap-6 justify-center items-center min-h-screen">
            <div className="flex flex-col gap-4 w-96">
                <div className="text-3xl font-bold">Login</div>
                <div>Enter your username and password to login to your account.</div>
            </div>
            <form onSubmit={formSubmit} className="flex flex-col items-start gap-4 w-96">
                <div className="flex flex-col gap-2 w-full">
                    <div className="text-sm">Username</div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        className="border indent-2 border-solid border-borderColor rounded w-full min-h-8 focus:border-black outline-none"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="text-sm">Password</div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        className="indent-2 border-solid border-borderColor border rounded w-full min-h-8 focus:border-black outline-none"
                    />
                </div>
                <button type="submit" className="w-full text-white rounded min-h-8 bg-black hover:bg-toHover">Login</button>
                <div className="flex flex-col items-center justify-center w-96 gap-4">
                    <div>Don't have an account? <Link href="/register" className="hover:underline font-bold">Sign Up</Link></div>
                    <div className="font-bold">{state?.error}</div>
                </div>
            </form>
        </div>
    );
};

export default Login;