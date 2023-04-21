import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/main-page";
import SignInPage from "./components/SignInPage/sign-in-page";
import SignUpPage from "./components/SignUpPage/sign-up-page";
import PasswordResetPage from "./components/PasswordResetPage/password-reset";
import NoMatch from "./components/NoMatch/no-match";
import Layout from "./components/Layout/layout";

import "./index.css";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="register" element={<SignUpPage />} />
          <Route path="/password/reset" element={<PasswordResetPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
