// kakao Redirect URI에 도달했을 때 보여줄 컴포넌트
// 인가코드를 받아서, axios를 활용해 해당 코드를 백엔드에게 넘겨주는 역할!
// Router컴포넌트에 라우팅 걸어놓았습니다.
import axios  from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoRedirect() {
    const navigate = useNavigate();
    const code = new URL(document.location.toString()).searchParams.get("code");

    useEffect(() => {
        axios.post(`/members/kakao/login`, { code }).then((r) => {
          const { token, userInfo } = r.data;
          document.cookie = `token=${token}; path=/`;
          console.log(r.data); // 토큰과 함께 들어오는 정보들

          //회원가입 - 로그인 분기처리
          //만약에 회원정보가 등록이 됐으면(userInfo 객체에 값이 있으면), 메인페이지로 이동(/)
          // 회원정보가 없으면(userInfo 객체에 값이 없으면), ProfileEditPage로 이동
          if (userInfo) {
            navigate("/");
          } else {
            navigate("/signup");
          }
        });
    }, []);


  return (
    <div>
      <span>로그인중입니다.</span>
      <span className="loading loading-bars loading-md"></span>
    </div>
  );
}




