import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider, LoadingProvider } from "@notebook/ui";
import { Loading } from "@notebook/ui"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LoadingProvider>
      <AlertProvider>
        <Loading width={"7rem"} height={"7rem"} />
        <App />
      </AlertProvider>
    </LoadingProvider>
  </BrowserRouter>,
);
