import { lazy } from "react"

const Landing = lazy(() => import("./src/components/Landing/Landing.tsx"));
const Notebook = lazy(() => import("./src/components/Notebook/Notebook.tsx"));
const NoteEditor = lazy(() => import("./src/components/NoteEditor/NoteEditor.tsx"));


export const routes = [
    { path: '/', component: Landing },
    { path: '/notes', component: Notebook },
    { path: '/notes/:id', component: NoteEditor },
]

