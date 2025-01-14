"use client"

import {signOut, useSession} from "next-auth/react";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import Notes from "../notes/Notes";

const Navigation = ({ children }) => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex justify-between fixed px-8 py-4 bg-black text-white min-h-20 max-h-24 min-w-full">
                <div className="flex justify-start items-center min-w-40">
                    {session?.username ? <Image src="/menu.png" alt="" width={40} height={30} onClick={() => setOpen(o => !o)} className="cursor-pointer"/> : <Image src="/menu.png" alt="" width={40} height={30} className="cursor-pointer"/>}
                </div>
                <div className="flex-1 flex justify-center items-center text-4xl">
                    <Link href="/">NextNote</Link>
                </div>
                {session?.username ? <div className="flex justify-end items-center gap-8 min-w-40 text-lg">
                    <Link href="/">
                        <Image src="/add.png" alt="" width={45} height={30} className="cursor-pointer"/>
                    </Link>
                    <button onClick={signOut} className="hover:underline text-2xl">Logout</button>
                </div> : <div className="flex justify-end items-center min-w-40 text-lg">
                    <Link href="/login" className="hover:underline text-2xl">Login</Link>
                </div>}
            </div>
            {open ? <div className="flex min-w-screen">
                <div className="flex flex-col bg-black text-white h-screen w-1/6 overflow-y-scroll">
                    {session?.username ? <div className="hidden gap-8 justify-center items-center p-4">
                        <Image src="/add.png" alt="" width={45} height={30} className="cursor-pointer"/>
                        <button onClick={signOut}>Logout</button>
                    </div> : <div className="hidden justify-center items-center p-4">
                        <Link href="/login">Login</Link>
                    </div>}
                    <Notes username={session?.username} accessToken={session?.accessToken}/>
                </div>
                { children }
            </div> : children}
        </>
    );
}

export default Navigation;