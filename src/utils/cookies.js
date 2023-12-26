import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 설정
export const setCookie = (type, token) => {
  // accessToken 만료시간 설정 (현재시간 기준)
    const accessExpiration = new Date(Date.now() + 60 * 60 * 1000); // 1시간

  // refreshToken 만료시간 설정 (현재시간 기준)
    const refreshExpiration = new Date(Date.now() + 60 * 60 * 24000 * 7); // 7일

  // 쿠키 설정
  if (type === "accessToken") {
    cookies.set(type, token, {
      path: "/",
      secure: true,
      expires: accessExpiration,
    });
  }

  if (type === "refreshToken") {
    cookies.set(type, token, {
      path: "/",
      secure: true,
      expires: refreshExpiration,
    });
  }
};

// 쿠키 조회
export const getCookie = (tokenType) => {
 return cookies.get(tokenType)
};


// 쿠키 삭제 (AccessToken과 RefreshToken을 모두 삭제)
export const removeCookie = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
};