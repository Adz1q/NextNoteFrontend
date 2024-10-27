"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormState } from 'react-dom';
import { useRouter } from "next/navigation";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [state, formSubmit] = useFormState(handleSubmit, undefined);

    const router = useRouter();

    async function handleSubmit(previousState, event) {
        event.preventDefault();

        try {
            const result = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if(!result || !result.ok) {
                throw { error: "Invalid username or password"};
            }

            router.push("/");
        }
        catch (error) {
            return error;
        }
    }

    return (
        <div className="flex flex-col gap-12 justify-center items-center min-h-full">
            <div>Enter your credentials</div>
            <form onSubmit={formSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button type="submit">Login</button>
                <div>{state?.error}</div>
            </form>
        </div>
    );
};

export default Login;