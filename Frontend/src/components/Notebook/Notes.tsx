import { FilePlusCorner } from "lucide-react";
import type { TNote } from "../../types/note.type";
import Note from "./Note";
import { Button, Col, Row } from "react-bootstrap";
import ContainerCenter from "../Helper/ContainerCenter";
import { useNavigate } from "react-router-dom";

interface NotesProps {
  notes: TNote[];
  onDelete: (nodeId: string) => void;
}
const Notes = ({ notes, onDelete }: NotesProps) => {
  const navigate = useNavigate();
  return (
    <Row>
      {notes.length == 0 ? (
        <>
          <h2 style={{ color: "white" }}>- No Notes</h2>
          <Button
            onClick={() => navigate("/notes/new", { replace: true })}
            variant="light"
            style={{ width: "140px" }}
          >
            Create Note <FilePlusCorner />
          </Button>
        </>
      ) : (
        <>
          <h2 style={{ color: "white" }}>- You have {notes.length} notes</h2>
          <ContainerCenter>
            {notes.map((note) => {
              return (
                <Col
                  key={note.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Note key={note.id} note={note} onDelete={onDelete} />
                </Col>
              );
            })}
          </ContainerCenter>
        </>
      )}
    </Row>
  );
};

export default Notes;
