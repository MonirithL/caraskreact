import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Home from "./page/Home.tsx";

import Callback from "./auth/Callback.tsx";
import { UserProvider } from "./context/UserContext.tsx";

import AuthLayout from "./auth/AuthLayout.tsx";
import NoAuthLayout from "./auth/NoAuthLayout.tsx";
import Landing from "./page/Landing.tsx";
import Login from "./page/Login.tsx";
import Register from "./page/Register.tsx";
import Account from "./page/Account.tsx";
import App from "./App.tsx";
import Qna from "./page/Qna.tsx";
import Logout from "./page/Logout.tsx";
import Discovery from "./page/Discovery.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* need layout to run check, if have a session jwt then try refresh, if refreshed then can go HOME, else stay here */}

        <Route element={<NoAuthLayout />}>
          <Route path="/" element={<Landing />} />
          <Route element={<Login />} path="/login" />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<Callback />} />
        </Route>

        <Route element={<App />}>
          <Route path="/testing" element={<Discovery />}></Route>
        </Route>

        {/* SHOULD actually be like,  if user is not logged in at / then go from the / -> home*/}
        <Route element={<UserProvider />}>
          <Route element={<AuthLayout />}>
            <Route element={<App />}>
              <Route path="/home" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/qna" element={<Qna />} />
              <Route path="/discovery" element={<Discovery />} />
              {/*               
              <Route path="/result_tempo" />
              <Route path="/result" />
              <Route path="/progress" />
              <Route path="/explore" />
               */}
            </Route>
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/manage">
                <Route path="/account_info" />
                <Route path="/accounts" />
                <Route path="/subscription" />
                <Route path="/authentication" />
                <Route path="/aboutapp" />
                <Route path="/support" />
              </Route> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
