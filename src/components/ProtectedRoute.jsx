import { Outlet, Navigate } from "react-router-dom";
import { loginState } from "@recoil/loginState.jsx";
import { useRecoilValue } from "recoil";

export const ProtectedRoute = () => {
  const isLogin = useRecoilValue(loginState);

  return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
};
