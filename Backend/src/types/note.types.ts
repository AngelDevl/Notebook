export interface NoteData {
  title: string;
  content: string;
}

export interface NoteUpdateData extends Partial<NoteData> {
  id: string;
}
