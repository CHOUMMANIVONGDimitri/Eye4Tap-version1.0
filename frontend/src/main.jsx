import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FolderProvider } from "./contexts/Folder";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <FolderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FolderProvider>
  </React.StrictMode>
);
