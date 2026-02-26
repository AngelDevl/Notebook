import { useEffect, useState } from "react";
import type { TNote } from "../../types/note.type";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import NoteTextBox from "./NoteTextBox";
import { useLoading } from "../Context/LoadingContext";
import { useAlert } from "../Context/AlertContext";
import getApiErrorMessage from "../../api/getApiErrorMessage";
import NoteViewModal from "./NoteViewModal";

const NoteEditor = () => {
  const [note, setNote] = useState<TNote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showView, setShowView] = useState(false);

  const { isLoading, showLoading, hideLoading } = useLoading();
  const { triggerAlert } = useAlert();
  const { id: noteId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseView = () => {
    setShowView(false);
  };

  const handleOpenView = () => {
    if (note && note.title.length > 0) {
        setShowView(true);
    } else {
        triggerAlert("Title cannot be empty when viewing a not", "warning")
    }
  };

  const saveNoteTemp = (title: string | null, content: string | null) => {
    setNote((prevNote) => {
      if (!prevNote) return prevNote;

      return {
        ...prevNote,
        title: title !== null ? title : prevNote.title,
        content: content !== null ? content : prevNote.content,
      };
    });
  };

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

  const saveNote = async () => {
    if (!note) {
      return;
    }

    if (note.title.length <= 0) {
      return triggerAlert("Title cannot be empty", "danger");
    }

    try {
      showLoading();
      if (noteId == "new") {
        const response = await api.post("/notes", {
          title: note.title,
          content: note.content,
        });
        const newNote = response.data.note;
        triggerAlert("Note created successfully");

        setNote(newNote);

        navigate(`/notes/${newNote.id}`, { replace: true });
      } else {
        const response = await api.put(`/notes/${noteId}`, {
          title: note.title,
          content: note.content,
        });

        const updatedNote = response.data.note;

        triggerAlert("Note has been saved successfully");

        setNote(updatedNote);
      }
    } catch (error: any) {
      triggerAlert(getApiErrorMessage(error), "danger");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode == "view") {
      setShowView(true);
    } else {
      setSearchParams({ mode: "edit" });
    }

    fetchNote();
  }, [noteId]);

  return note ? (
    <>
      <NoteViewModal
        note={note}
        show={showView}
        handleCloseView={handleCloseView}
      />
      <NoteTextBox
        note={note}
        saveNoteTemp={saveNoteTemp}
        saveNote={saveNote}
        handleOpenView={handleOpenView}
      />
    </>
  ) : (
    !isLoading && <h1>{error}</h1>
  );
};

export default NoteEditor;
