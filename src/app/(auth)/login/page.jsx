"use client"

import handleLogin from "@/lib/action";
import { useState } from "react";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col gap-12 justify-center items-center min-h-full">
            <div>Enter your credentials</div>
            <form className="flex flex-col gap-4">
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
                <button type="submit" onClick={(event) => { event.preventDefault(); handleLogin(username, password);}}>Login</button>
            </form>
        </div>
      );
};

export default Login;