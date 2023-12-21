import { Outlet, Navigate } from "react-router-dom";
import { isLoginSelector } from "@recoil/LoginState.jsx";
import { useRecoilValue } from "recoil";

export const ProtectedRoute = () => {
  const isLogin = useRecoilValue(isLoginSelector);

  return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
};
