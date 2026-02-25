import { useEffect, useState } from "react";
import type { TNote } from "../../types/note.type";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import NoteTextBox from "./NoteTextBox";
import { useLoading } from "../Context/LoadingContext";
import { useAlert } from "../Context/AlertContext";
import getApiErrorMessage from "../../api/getApiErrorMessage";

const NoteEditor = () => {
  const [note, setNote] = useState<TNote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, showLoading, hideLoading } = useLoading();
  const { triggerAlert } = useAlert();
  const { id: noteId } = useParams();
  const navigate = useNavigate();

  const fetchNote = async () => {
    if (noteId == "new") {
      setNote({
        id: noteId,
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
      });

      return;
    }

    try {
      showLoading();
      const response = await api.get(`/notes/${noteId}`);
      const note: TNote = response.data.note;
      setNote(note);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      hideLoading();
    }
  };

  const saveNote = async (title: string, content: string) => {
    if (title.length <= 0) {
      return triggerAlert("Title cannot be empty", "danger");
    }

    try {
      showLoading();
      if (noteId == "new") {
        const response = await api.post("/notes", { title, content });
        const newNote = response.data.note;
        triggerAlert("Note created successfully");

        setNote(newNote);

        navigate(`/notes/${newNote.id}`, { replace: true });
      } else {
        await api.put(`/notes/${noteId}`, { title, content });
        triggerAlert("Note has been saved successfully");
      }
    } catch (error: any) {
      triggerAlert(getApiErrorMessage(error), "danger");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchNote();
  }, [noteId]);

  return !isLoading && note ? (
    <NoteTextBox note={note} saveNote={saveNote} />
  ) : (
    <h1>{error}</h1>
  );
};

export default NoteEditor;
