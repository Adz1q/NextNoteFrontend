"use client"

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {

    const { data: session } = useSession();

    return (
        <div></div>
    );
}

export default Home;
