"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import Link from "next/link";

const Register = () => {
    const { data: session } = useSession();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
            if(username.length < 4 || username.length > 20) {
                throw { error: "Username must be between 4 and 20 characters!" };
            }

            if(password !== confirmPassword) {
                throw { error: "Passwords do not match!" };
            }

            if(password.length < 8 || password.length > 30) {
                throw { error: "Password must be between 8 and 30 characters!" };
            }

            const result = await fetch("http://localhost:8080/api/db/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if(!result || !result.ok) {
                throw { error: "Cannot register!" };
            }

            router.push("/login");
        }
        catch(error) {
            return error;
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
            <div className="flex flex-col gap-4 w-96">
                <div className="text-3xl font-bold">Register</div>
                <div>Enter your username and password to register for an account.</div>
            </div>
            <form onSubmit={formSubmit} className="flex flex-col gap-4 items-start w-96">
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
                <div className="flex flex-col gap-2 w-full">
                    <div className="text-sm">Password</div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        className="border indent-2 border-solid border-borderColor rounded w-full min-h-8 focus:border-black outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="text-sm">Confirm Password</div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        className="border indent-2 border-solid border-borderColor rounded w-full min-h-8 focus:border-black outline-none"
                    />
                </div>
                <button type="submit" className="w-full text-white rounded min-h-8 bg-black hover:bg-toHover">Register</button>
                <div className="flex flex-col items-center justify-center w-96 gap-4">
                    <div>Already have an account? <Link href="/login" className="font-bold hover:underline">Login</Link></div>
                    <div className="font-bold">{state?.error}</div>
                </div>
            </form>
        </div>
    );
};

export default Register;