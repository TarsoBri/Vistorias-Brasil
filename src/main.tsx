import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// contexts
import { AutheticateProvider } from "./contexts/authenticateContext.tsx";
import { AuthToUseProvider } from "./contexts/authToUseContext.tsx";
import { CodeRecoveryProvider } from "./contexts/CodeRecoveryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthToUseProvider>
      <CodeRecoveryProvider>
        <AutheticateProvider>
          <App />
        </AutheticateProvider>
      </CodeRecoveryProvider>
    </AuthToUseProvider>
  </React.StrictMode>
);
