import SingleNote from "@/components/singleNote/singleNote";

const Note = async ({ params }) => {
    const { id } = await params;
    const paramsId = parseInt(id, 10);

    const note = await getNote(paramsId);

    if (!note) {
        return <div>Unable to fetch the note</div>;
    }

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

            return await result.json();
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <SingleNote propsId={paramsId} propsTitle={note.title} propsContent={note.content} propsUsername={note.username}/>
    );
};

export default Note;