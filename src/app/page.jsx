"use client"

import {Textarea} from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Home = () => {

    const { data: session } = useSession();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [state, formSubmit] = useFormState(handleSubmit, undefined);

    const router = useRouter();

    async function handleSubmit(previousState, event) {
        event.preventDefault();

        try {
            if(!session?.username) {
                throw { error: <div className="">You must be logged in!<br /><br /><Link href="/login" className="hover:underline">➜ Click the message to login</Link></div> };
            }

            if(title === "") {
                throw { error: "Title cannot be empty!" };
            }

            if(title.length < 1 || title.length > 100) {
                throw { error: "Title must be between 1 and 100 characters!" };
            }

            if(content.length > 65000) {
                throw { error: "The maximum size of content is 65000 characters!" };
            }

            const result = await fetch("http://localhost:8080/api/db/note/create", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                           "Authorization": `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    username: session?.username,
                }),
            });

            if(!result || !result.ok) {
                throw { error: "Cannot create note!" };
            }

            setTitle(t => t = "");
            setContent(c => c = "");
            router.push("/");
        }
        catch (error) {
            return error;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen text-black">
            <form onSubmit={formSubmit} className="flex h-full mt-48 mb-40 w-full ml-32 mr-32 gap-8">
                <div className="flex flex-col items-center gap-8 ml-32">
                    <input
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        placeholder="Title"
                        className="w-96 h-8 bg-transparent border text-black rounded-sm indent-2 outline-none border-borderColor focus:border-black"
                    />
                    <Button variant="outline" className="text-md w-96 border border-borderColor rounded-md bg-black text-white hover:bg-toHover hover:text-white">Create Note</Button>
                    <div className="w-96 text-lg text-center text-black font-bold">{state?.error}</div>
                </div>
                <Textarea className="mr-32 text-lg border-borderColor focus:border-toHover border outline-none" placeholder="Enter your note" value={content} onChange={event => setContent(event.target.value)}/>
            </form>
        </div>
    );
}

export default Home;
