import SingleNote from "@/components/singleNote/SingleNote";
import {getSession} from "next-auth/react";

const getNote = async (id) => {
    try {
        const result = await fetch(`http://localhost:8080/api/db/note/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!result || !result.ok) {
            throw { error: "Cannot get note!" };
        }

        return await result.json();
    }
    catch(error) {
        console.error(error);
    }
}

const Note = async ({ params }) => {
    const { id } = params;
    const note = await getNote(id);

    return (
        <SingleNote propsId={note.id} propsTitle={note.title} propsContent={note.content} propsUsername={note.username}/>
    );
};

export default Note;