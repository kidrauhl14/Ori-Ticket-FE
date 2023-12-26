// kakao Redirect URI에 도달했을 때 인가코드를 받아서 띄워줄 페이지
// 인가코드를 받아서, axios를 활용해 해당 코드를 백엔드에게 넘겨주는 역할!
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import useAxios from "@hooks/useAxios";
import SuccessLogin from "@/utils/successLogin";
import Spinner from "@components/common/Spinner";

export default function KakaoRedirect() {
    const navigate = useNavigate();
    const code = new URL(document.location.toString()).searchParams.get("code");
    const {fetchDataUseAxios}= useAxios();

    useEffect(() => {
      fetchDataUseAxios("defaultAxios", {
        method: "post",
        url: "http://13.124.46.138:8080/members/kakao/login",
        data: { code }
      }).then((response) => {
        if(response && response.status === 200){
          <SuccessLogin response={response} />;

          // 서버에서 유저 정보가 없다면 보내줄 주소를 알기 때문에 
          // 서버에서부터 해당 페이지로 리다이렉트를 해주는 것이 보안적으로 조금 더 안전한 방법입니다.
          // 백엔드에서 조회한 정보를 기반으로 해당 Route 주소(KakaoRedirect)로 리다이렉트를 해달라고 하시면 될 것 같아요!
          navigate('/'); // 로그인 성공 후 메인페이지로 이동 (우선은 프론트에서 처리했습니다.)      
        }

      }).catch((error) => {
        console.error("카카오 로그인 에러:", error);
      });
    }, []);
    
    

  return (
    <>
      <Spinner />
    </>
  );
}




