import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import {accessTokenState, isLoginSelector, userInfoState} from '@recoil/LoginState.jsx';
import { useNavigate, Link } from "react-router-dom";

// image
import Arrow from "@assets/img_arrow.png";
import Adminchat from "@assets/img_adminchat.png";
import Chat from "@assets/img_chat.png";
import MyProfile from "@assets/img_myprofile.png";

export default function Navbar() {
  const setAccessToken = useSetRecoilState(accessTokenState)
  const isLogin = useRecoilValue(isLoginSelector)

  // if(isLogin){

  // } else {
  //   navigate('/login')
  // }

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // go back
  };

  return (
    <div className="flex justify-between mt-4 mb-20">
      <div className="ml-1">
        <img
          src={Arrow}
          alt="Go back"
          onClick={handleGoBack}
        />
      </div>
      <div className="w-96"></div>
      <div className="flex">
        <div className="mr-6">
          <Link to="/service">
            <img src={Adminchat} alt="관리자 채팅" />
          </Link>
        </div>
        <div className="mr-4">
          <Link to="/chatlist">
            <img src={Chat} alt="채팅" />
          </Link>
        </div>
        <div className="mr-1">
          <Link to="/profile">
            <img src={MyProfile} alt="내 프로필" />
          </Link>
        </div>
      </div>
    </div>
  );
}
