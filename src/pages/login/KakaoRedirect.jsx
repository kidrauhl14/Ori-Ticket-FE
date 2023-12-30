// kakao Redirect URI에 도달했을 때 인가코드를 받아서 띄워줄 페이지
// 인가코드를 받아서, axios를 활용해 해당 코드를 백엔드에게 넘겨주는 역할!
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useSetRecoilState } from "recoil";
// import useAxios from "@hooks/useAxios";
// import SuccessLogin from "@/utils/successLogin";
import Spinner from "@components/common/Spinner";

export default function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get("code");
  // const {fetchDataUseAxios}= useAxios();

  useEffect(() => {
    // 인가코드 백엔드로 보내기
    axios
      .get("http://13.124.46.138:8080/members/kakao/login", { code })
      .then((response) => {
        if (response && response.status === 200) {
          console.log("인가코드 제대로 보내졌고, response 받음", response);
          // 인가코드 보내고나서 response값으로 받은 개인정보에서, email만 백엔드로 보냄
          axios
            .post("http://13.124.46.138:8080/members/signin", {
              email: response.data.email,
            })
            .then((response) => {
              // email보내고나서, 응답이 true면 메인페이지로, false면 회원가입 페이지로 이동
              if (response.data) {
                navigate("/");
              } else {
                navigate("/signup");
              }
            });
        }
      })
      .catch((error) => {
        console.error("카카오 로그인 에러:", error);
      });
  }, []);

  // useEffect(() => {
  //   fetchDataUseAxios("defaultAxios", {
  //     method: "post",
  //     url: "https://oriticket.link/members/kakao/login",
  //     data: { code },
  //   })
  //     .then((response) => {
  //       if (response && response.status === 200) {
  //         fetchDataUseAxios("defaultAxios", {
  //           method: "post",
  //           url: "https://oriticket.link/members/signin",
  //           data: { email: response.data.email },
  //         }).then((response) => {
  //           if (response.data) {
  //             navigate("/");
  //           } else {
  //             navigate("/signup");
  //           }
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("카카오 로그인 에러:", error);
  //     });
  // }, []);

  return (
    <>
      <Spinner />
    </>
  );
}
