import type { TNote } from "../../types/note.type";
import Note from "./Note";
import { Col, Row } from "react-bootstrap";

interface NotesProps {
  notes: TNote[];
  onDelete: (nodeId: string) => void
}
const Notes = ({ notes, onDelete }: NotesProps) => {
  return (
    <Row>
      {notes.map((note) => {
        return (
          <Col key={note.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Note key={note.id} note={note} onDelete={onDelete} />
          </Col>
        );
      })}
    </Row>
  );
};

export default Notes;
