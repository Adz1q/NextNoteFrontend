"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if(result.ok) {
            console.log("Zalogowano pomyślnie");
        }
        else {
            console.error("Błąd logowania");
        }
    }

    return (
        <div className="flex flex-col gap-12 justify-center items-center min-h-full">
            <div>Enter your credentials</div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            </form>
        </div>
      );
};

export default Login;