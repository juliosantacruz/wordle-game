import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout/MainLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainLayout>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainLayout>
  </React.StrictMode>
);
