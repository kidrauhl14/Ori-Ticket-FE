import LoginPage from "@pages/LoginPage";
import SignupPage from "@pages/SignupPage";
import MainPage from "@pages/MainPage";
import PostPage from "@pages/PostPage";
import CategoryPage from "@pages/CategoryPage";
import DetailPage from "@pages/DetailPage";
import PaymentPage from "@pages/PaymentPage";
import ProfilePage from "@pages/ProfilePage";
import AdminPage from "@pages/AdminPage";
import ChatPage from "@pages/ChatPage";
import { Route, Routes, Navigate } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}
