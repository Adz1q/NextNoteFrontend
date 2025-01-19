import Link from "next/link";

const NoteCard = ({id, title}) => {
  return (  
    <Link href={`/${id}`} prefetch={false} className="flex justify-center items-center hover:underline">
        <h1>{title}</h1>
    </Link>
  );
};

export default NoteCard;