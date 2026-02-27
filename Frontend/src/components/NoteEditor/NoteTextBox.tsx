import { Form, Container, Button } from "react-bootstrap";
import type { TNote } from "../../types/note.type";
import { useLoading } from "../Context/LoadingContext";
import { Eye } from "lucide-react";

interface BoxProps {
  note: TNote;
  saveNoteTemp: (title: string | null, content: string | null) => void;
  saveNote: () => void;
  handleOpenView: () => void;
}

const NoteTextBox = ({
  note,
  saveNoteTemp,
  saveNote,
  handleOpenView,
}: BoxProps) => {
  const { isLoading } = useLoading();

  return (
    <Container className="mt-4">
      <h1>{note.id == "new" ? "Creating" : "Editing"} note</h1>
      <Form>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Enter note title:</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            autoFocus={true}
            value={note.title}
            onChange={(e) => saveNoteTemp(e.target.value, null)}
            placeholder="Type note title..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Enter note text:</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={note.content}
            onChange={(e) => saveNoteTemp(null, e.target.value)}
            placeholder="Type note content..."
          />
        </Form.Group>
      </Form>
      <br></br>
      <Button
        variant="light"
        style={{ marginRight: "10px" }}
        disabled={isLoading}
        onClick={() => saveNote()}
      >
        {note.id == "new" ? "Create Note" : "Save Note"}
      </Button>
      <Button variant="light" onClick={() => handleOpenView()}>
        <Eye />
      </Button>
    </Container>
  );
};

export default NoteTextBox;
