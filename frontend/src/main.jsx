import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FolderProvider } from "./contexts/Folder";
import { AuthProvider } from "./contexts/useAuth";
import App from "./App";
import "./assets/css/App.css";
import "./assets/css/Glitch.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <FolderProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </FolderProvider>
  </React.StrictMode>
);
