import { useState } from "react";
import LoginPage from "@pages/login/LoginPage";
import SignupPage from "@pages/SignupPage";
import MainPage from "@pages/MainPage";
import PostPage from "@pages/PostPage";
import CategoryPage from "@pages/CategoryPage";
import DetailPage from "@pages/DetailPage";
import PaymentPage from "@pages/PaymentPage";
import ProfilePage from "@pages/ProfilePage";
import ProfileEditPage from "@pages/ProfileEditPage";
import AdminPage from "@pages/AdminPage";
import ChatPage from "@pages/ChatPage";
import ChatlistPage from "@pages/ChatlistPage";
import ServicePage from "@pages/ServicePage";
import KakaoRedirect from "@pages/login/KakaoRedirect";
import { Route, Routes, Navigate } from "react-router-dom";
import {ProtectedRoute} from "@components/ProtectedRoute.jsx";

export default function Router() {
  // const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* `${apiServer}/members/${userId}` */}
      <Route path="/auth/kakao/callback" element={<KakaoRedirect />} />

      
      {/* 유저전용 */}
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/detail/:salePostId" element={<DetailPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<ProfileEditPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/chatlist" element={<ChatlistPage />} />
      <Route path="/chatlist/:room_id" element={<ChatPage />} />
      <Route path={`/service`} element={<ServicePage />} />
      {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
      {/* </Route> */}
    </Routes>
  );
}
