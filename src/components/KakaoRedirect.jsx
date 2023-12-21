// kakao Redirect URI에 도달했을 때 보여줄 컴포넌트
// 인가코드를 받아서, axios를 활용해 해당 코드를 백엔드에게 넘겨주는 역할!
import axios  from "axios";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenState, userInfoState} from "@recoil/LoginState.jsx";

export default function KakaoRedirect() {
    const navigate = useNavigate();
    const code = new URL(document.location.toString()).searchParams.get("code");
    const setAccessToken = useSetRecoilState(accessTokenState);
    const setUserInfoId = useSetRecoilState(userInfoState);

    useEffect(() => {
        axios
          .post("http://13.124.46.138:8080/members/kakao/login", { code })
          .then((res) => {
            // const { token, userInfo } = res.data;
            // setAccessToken(res.data.accessToken);
            // setUserInfoId((prevUserInfo) => ({
            //   ...prevUserInfo,
            //   id: res.data.id,
            // }));
            console.log(res.data); // 토큰과 함께 들어오는 정보들

            //회원가입 - 로그인 분기처리
            //만약에 회원정보가 등록이 됐으면(userInfo 객체에 값이 있으면), 메인페이지로 이동(/)
            // 회원정보가 없으면(userInfo 객체에 값이 없으면), ProfileEditPage로 이동
            // if (userInfoState.id) {
            //   navigate("/");
            // } else {
            //   navigate("/signup");
            // }
          })
          .catch((error) => {
            console.error("카카오 로그인 에러:", error);
          });
    }, []);

  return (
    <div>
      <span>로그인중입니다.</span>
      <span className="loading loading-bars loading-md"></span>
    </div>
  );
}




