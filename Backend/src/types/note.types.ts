export interface NoteData {
  title: string;
  content: string;
}

export interface NoteUpdateData extends Partial<NoteData> {
  noteId: string;
}
