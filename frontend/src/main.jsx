import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./app.jsx";
import { KonstaProvider } from "konsta/react";
import { App as KonstaApp } from "konsta/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "./components/app-context.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <KonstaProvider theme="ios">
      <AppContextProvider>
        <KonstaApp theme="ios" safeAreas>
          <Router>
            <App />
          </Router>
        </KonstaApp>
      </AppContextProvider>
    </KonstaProvider>
  </StrictMode>
);
