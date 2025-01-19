"use client"

import { useEffect, useState } from "react";
import NoteCard from "../noteCard/NoteCard";

const Notes = ({ username, accessToken }) => {

    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        try {
            const result = await fetch(`http://localhost:8080/api/db/note/user/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            });

            if(!result || !result.ok) {
                throw { error: "Cannot get notes!" };
            }

            const data = await result.json();
            setNotes(data);
            console.log(data);
        }
        catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(username && accessToken) {
            getNotes();
        }
    });

    return (
        <div className="flex flex-col justify-center items-center gap-12 p-6">
            {notes.sort((a, b) => b.id - a.id).map(note => <NoteCard key={note.id} id={note.id} title={note.title}/>)}
        </div>
  );
};

export default Notes;