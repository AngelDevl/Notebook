import { useEffect, useState } from "react";
import Notes from "./Notes";
import api from "../../api/axios";
import type { TNote } from "../../types/note.type";
import { Container } from "react-bootstrap";
import { useLoading } from "../Context/LoadingContext";
import { useAlert } from "../Context/AlertContext";
import getApiErrorMessage from "../../api/getApiErrorMessage";

const Notebook = () => {
  const [notes, setNotes] = useState<TNote[] | null>(null);
  const { isLoading, showLoading, hideLoading } = useLoading();
  const { triggerAlert } = useAlert();

  const deleteNote = async (noteId: string) => {
    try {
      showLoading();
      await api.delete(`/notes/${noteId}`);

      setNotes((prevNotes) =>
        prevNotes ? prevNotes.filter((note) => note.id !== noteId) : null,
      );
      triggerAlert("Note deleted successfully");
    } catch (error) {
      triggerAlert(getApiErrorMessage(error), "danger");
    } finally {
      hideLoading();
    }
  };

  const fetchNotes = async () => {
    try {
      showLoading();
      const response = await api.get("/notes");
      const notes: TNote[] = response.data;
      setNotes(notes);
    } catch (error) {
      triggerAlert(getApiErrorMessage(error), "danger");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {!isLoading && notes && (
        <Container className="mt-4">
          <h1 style={{ color: "white" }}>My Notes</h1>
          <Notes notes={notes} onDelete={deleteNote} />
        </Container>
      )}
    </div>
  );
};

export default Notebook;
