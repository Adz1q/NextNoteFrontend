import SingleNote from "@/components/singleNote/singleNote";

const Note = async ({ params }) => {
    const { id } = await params;
    const paramsId = parseInt(id, 10);

    const note = await getNote(paramsId);
    console.log(note);

    async function getNote(id) {
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

            console.log(result.json());
            return await result.json();
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <SingleNote propsId={id} propsTitle={note.title} propsContent={note.content} propsUsername={note.username}/>
    );
};

export default Note;