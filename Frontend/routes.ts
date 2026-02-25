import { lazy } from "react"

const Notebook = lazy(() => import("./src/components/Notebook/Notebook.tsx"));
const NoteEditor = lazy(() => import("./src/components/NoteEditor/NoteEditor.tsx"));


export const routes = [
    { path: '/notes', component: Notebook },
    { path: '/notes/:id', component: NoteEditor },

]

