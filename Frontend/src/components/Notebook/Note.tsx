import type { TNote } from "../../types/note.type";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useLoading } from "../Context/LoadingContext";
import "../../css/note.css";
import { useNavigate } from "react-router-dom";

interface NoteProps {
  note: TNote;
  onDelete: (noteId: string) => void;
}
const Note = ({ note, onDelete }: NoteProps) => {
  const { isLoading } = useLoading();
  const navigate = useNavigate();
  return (
    <Card className="note-card" style={{ width: "18rem" }}>
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
          style={{ marginRight: "10px" }}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </Button>
        <Button
          style={{ marginRight: "10px" }}
          variant="primary"
          onClick={() =>
            navigate(`/notes/${note.id}?mode=edit`, { replace: true })
          }
        >
          Edit
        </Button>
        <Button
          variant="info"
          onClick={() =>
            navigate(`/notes/${note.id}?mode=view`, { replace: true })
          }
        >
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Note;
