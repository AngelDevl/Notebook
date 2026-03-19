import { NoteData } from "../../src/types/note.types";

export type NoteBuilderData = NoteData & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

class NoteBuilder {
  id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setContent(content: string) {
    this.content = content;
    return this;
  }

  setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
    return this;
  }

  setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
    return this;
  }

  build(): NoteBuilderData {
    const note: NoteBuilderData = {
      title: this.title,
      content: this.content,
    };

    if (this.id) note.id = this.id;
    if (this.createdAt) note.createdAt = this.createdAt;
    if (this.updatedAt) note.updatedAt = this.updatedAt;

    return note;
  }
}

export default NoteBuilder;
