// kakao Redirect URI에 도달했을 때 인가코드를 받아서 띄워줄 페이지
// 인가코드를 받아서, axios를 활용해 해당 코드를 백엔드에게 넘겨주는 역할!
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState } from "@recoil/emailState.jsx";
import axios from "axios";
// import { useSetRecoilState } from "recoil";
// import useAxios from "@hooks/useAxios";
// import SuccessLogin from "@/utils/successLogin";
import Spinner from "@components/common/Spinner";

export default function KakaoRedirect() {
  const navigate = useNavigate();
  const [email, setEmail] = useRecoilState(emailState);
  const code = new URL(
    document.location.toString()
  ).searchParams.get("code");
  // const {fetchDataUseAxios}= useAxios();
  console.log("KakaoRedirect컴포넌트가 실행이 된걸까?");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `https://oriticket.link/members/kakao/login?code=${code}`
        );
        console.log(
          "인가코드 제대로 보내졌고, response 받음",
          response1
        );

        const response2 = await axios.post(
          "https://oriticket.link/members/signin",
          {
            email: response1.data.kakao_account.email,
          }
        );

        console.log(
          "회원정보 등록 페이지로 이동할 때 받을 (response2.data)",
          response2.data
        );
        console.log(
          "회원정보 등록 페이지로 이동할 때 받을 이메일 값 (response2.data.email)",
          response2.data.email
        );

        if (response2.data.existsByEmail) {
          if (response2.data.id === 2) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          setEmail(response2.data.email);
          navigate("/signup");
        }
      } catch (error) {
        console.error("카카오 로그인 에러:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Spinner />
    </>
  );
}
