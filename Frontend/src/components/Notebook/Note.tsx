import React from "react";
import type { TNote } from "../../types/note.type";
import Card from "react-bootstrap/Card";
import "../../note.css";

interface NoteProps {
  note: TNote;
}
const Note = ({ note }: NoteProps) => {
  return (
    <Card
      className="note-card"
      onClick={() => window.location.replace(`/notes/${note.id}`)}
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          uuid: {note.id}
        </Card.Subtitle>
        <Card.Text>Created At: {note.createdAt}</Card.Text>
        <Card.Text>Updated At: {note.updatedAt}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;
