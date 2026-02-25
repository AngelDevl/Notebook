import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import type { TNote } from "../../types/note.type";
import { useLoading } from "../Context/LoadingContext";

interface BoxProps {
  note: TNote;
  saveNote: (title: string, content: string) => void;
}

const NoteTextBox = ({ note, saveNote }: BoxProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const { isLoading } = useLoading();

  return (
    <Container className="mt-4">
      <Form>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Enter note title:</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type something..."
          />
        </Form.Group>
      </Form>

      <Form>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Enter note text:</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type something..."
          />
        </Form.Group>
      </Form>
      <br></br>
      <Button disabled={isLoading} onClick={() => saveNote(title, content)}>Save Note</Button>
    </Container>
  );
};

export default NoteTextBox;
