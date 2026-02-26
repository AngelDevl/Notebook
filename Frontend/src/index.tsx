import { createRoot } from "react-dom/client";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "./components/Context/AlertContext.tsx";
import { LoadingProvider } from "./components/Context/LoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LoadingProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </LoadingProvider>
  </BrowserRouter>,
);
