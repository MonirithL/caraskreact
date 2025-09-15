import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Home from "./page/Home.tsx";
import AuthLayout from "./auth/AuthLayout.tsx";
import Callback from "./auth/Callback.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import Login from "./page/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<UserProvider />}>
          <Route element={<Login />} path="/login" />
          <Route path="/home" element={<Home />} />
          <Route path="/auth/callback" element={<Callback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
