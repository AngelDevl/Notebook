import type { TNote } from "../../types/note.type";
import Card from "react-bootstrap/Card";
import "../../css/note.css";
import { Button } from "react-bootstrap";
import { useLoading } from "../Context/LoadingContext";

interface NoteProps {
  note: TNote;
  onDelete: (noteId: string) => void;
}
const Note = ({ note, onDelete }: NoteProps) => {
  const { isLoading } = useLoading();

  return (
    <Card
      className="note-card"
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          uuid: {note.id}
        </Card.Subtitle>
        <Card.Text>Created At: {note.createdAt}</Card.Text>
        <Card.Text>Updated At: {note.updatedAt}</Card.Text>
        <Button
          disabled={isLoading}
          variant="danger"
          style={{marginRight: "10px"}}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </Button>
        <Button
          variant="primary"
          onClick={() => window.location.replace(`/notes/${note.id}`)}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Note;
