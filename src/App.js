import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage/main-page";
import AccountActivationPage from "./components/Pages/AccountActivationPage/account-activation-page";
import SignInPage from "./components/Pages/SignInPage/sign-in-page";
import CreatePostPage from "./components/Pages/CreatePostPage/create-post-page";
import SignUpPage from "./components/Pages/SignUpPage/sign-up-page";
import PasswordResetPage from "./components/Pages/PasswordResetPage/password-reset-page";
import PasswordForgotChangePage from "./components/Pages/PasswordForgotChangePage/password-forgot-change-page";
import AccountProfilePage from "./components/Pages/AccountProfilePage/account-profile-page";
import PostsPage from "./components/Pages/PostsPage/posts-page";
import PostPage from "./components/Pages/PostPage/post-page";
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
          <Route
            path="account/email/activation/:activationToken"
            element={<AccountActivationPage />}
          />
          <Route
            path="account/password/forget/:passwordResetToken"
            element={<PasswordForgotChangePage />}
          />
          <Route path="password/reset" element={<PasswordResetPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/post/create" element={<CreatePostPage />} />
          <Route path="profile" element={<AccountProfilePage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
