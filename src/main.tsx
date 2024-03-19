import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// context
import { AutheticateProvider } from "./contexts/authenticateContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AutheticateProvider>
      <App />
    </AutheticateProvider>
  </React.StrictMode>
);
