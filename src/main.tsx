import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router";
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
import Progress from "./page/Progress.tsx";
import Explore from "./page/Explore.tsx";
import AccountInfo from "./page/manage/AccountInfo.tsx";
import NotSignIn from "./component/NoSignedIn.tsx";
import { QnaProvider } from "./context/QnaContext.tsx";
import Result from "./page/Result.tsx";
import History from "./page/History.tsx";
import SeemoreExplore from "./page/Seemore.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import Subscriptions from "./page/manage/Subscriptions.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      {/* need layout to run check, if have a session jwt then try refresh, if refreshed then can go HOME, else stay here */}

      <Route element={<NoAuthLayout />}>
        <Route path="/" element={<Landing />} />

        <Route element={<ToastProvider />}>
          <Route element={<Login />} path="/login" />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/auth/callback" element={<Callback />} />
      </Route>

      <Route element={<App />}>
        <Route path="/testing" element={<NotSignIn />}></Route>
      </Route>

      {/* SHOULD actually be like,  if user is not logged in at / then go from the / -> home*/}
      <Route element={<UserProvider />}>
        <Route element={<AuthLayout />}>
          <Route element={<App />}>
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route element={<QnaProvider />}>
              <Route path="/qna" element={<Qna />} />
            </Route>

            <Route path="/result" element={<Result />} />

            <Route path="/discovery" element={<Discovery />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/history" element={<History />} />
            <Route path="/seemore" element={<SeemoreExplore />} />
            <Route path="/manage">
              <Route path="account_info" element={<AccountInfo />} />
              <Route path="subscriptions" element={<Subscriptions />} />
            </Route>
            {/*               
              <Route path="/result_tempo" />
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
        <Route path="*" element={<Navigate to={"/"} replace/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
