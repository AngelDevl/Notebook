import React, { useEffect, useState } from "react";
import Notes from "./Notes";
import api from "../../api/axios";
import type { TNote } from "../../types/note.type";
import { Container } from "react-bootstrap";

const Notebook = () => {
  const [notes, setNotes] = useState<TNote[] | null>(null);
  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      const notes: TNote[] = response.data;
      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {" "}
      {notes ? (
        <Container className="mt-4">
          <h1 style={{ color: "white" }}>My Notes</h1>
          <Notes notes={notes} />
        </Container>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Notebook;
