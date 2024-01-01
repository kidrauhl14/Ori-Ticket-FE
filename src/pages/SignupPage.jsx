import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "@recoil/loginState";
import { userInfoState } from "@recoil/userInfoState";
import { emailState } from "@recoil/emailState.jsx";

export default function SignupPage(){
  const { replace } = useNavigate();
  const [isChecked, setIsChecked] = useState([false, false, false, false]);
  const [email, setEmail] = useRecoilState(emailState);

  // "등록할" 회원정보를 관리할 상태 객체
  const [signupInfo, setSignupInfo] = useState({
    email:"",
    name: "",
    birthDate: "",
    phoneNum: "",
  });

    // 회원정보 등록페이지가 렌더링되면, emailState에서 받아온 이메일 값을 signupInfo 객체에 넣어주기
    useEffect(() => {
      setSignupInfo((prevSignupInfo) => ({
        ...prevSignupInfo,
        email: email,
      }));
    }, []);

  console.log(signupInfo.email);

  const [verification, setVerification] = useState("");
  
  // 가입하기 버튼 상태 (활성화/비활성화)
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);

  const toggleCheckbox = (index) => {
    const newChecked = [...isChecked];
    newChecked[index] = !newChecked[index];
    setIsChecked(newChecked);
  };

  const sendVerification = () => {
    axios
      .post("https://oriticket.link/send-one", {
        phoneNum: signupInfo.phoneNum,
      })
      .then((res) => {
        // 들어온 인증번호값과 사용자가 입력한 인증번호값이 같은지 확인
        // 같으면, 가입하기 버튼을 누를 수 있음
        console.log("인증번호다!", res.data.getSubject);
        console.log("인증번호다!", res.data);
        setVerification(res.data.getSubject);
        console.log(signupInfo);
      })
      .catch((error) => {
        console.log("인증번호 전송 중 오류 발생:", error);
      });
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("https://oriticket.link/members/signup", signupInfo)
      .then((res) => {
        replace("/");
        console.log("로그인 성공!");
        console.log(signupInfo);
      })
      .catch((error) => {
        console.log("An error occurred:", error);
        console.log(signupInfo);
      });
  };



  return (
    <>
      <div className="w-64 lg:w-72 xl:w-80 2xl:w-96">
        <h1 className=" font-extrabold">회원가입</h1>
        <div className="grid-rows-6 w-full my-10">
          <form onSubmit={register} action="/members/signup" method="post">
            <div className="py-4 text-left">
              <label htmlFor="email" className="font-bold">
                이메일
              </label>
              <br />
              <input
                type="email"
                id="email"
                className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
                placeholder="ori_ticket@gmail.com"
                value={email}
                readOnly
                required
              />
            </div>
            <div className="py-4 text-left">
              <label htmlFor="username" className="font-bold">
                이름
              </label>
              <br />
              <input
                type="text"
                name="name"
                id="username"
                className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
                placeholder="김오리"
                value={signupInfo.name}
                onChange={(e) => {
                  setSignupInfo({ ...signupInfo, name: e.target.value });
                }}
                required
              />
            </div>

            <div className="py-4 text-left w-full">
              <label htmlFor="birthdate">생년월일</label>
              <br />
              <Datepicker
                primaryColor={"indigo"}
                asSingle={true}
                value={signupInfo.birthDate}
                dateFormat="MM-dd-yyyy"
                id="birthdate"
                name="birthDate"
                onChange={({ startDate }) => {
                  const formattedDate = `${startDate}T00:00:00`;
                  setSignupInfo({ ...signupInfo, birthDate: formattedDate });
                  console.log(formattedDate);
                }}
                className="w-full"
                required
              />
            </div>
            <div className="py-4 text-left">
              <label htmlFor="phone">휴대폰 번호</label>
              <br />
              <div className="flex">
                <input
                  type="tel"
                  name="phoneNum"
                  id="phone"
                  placeholder="01012345678"
                  className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
                  value={signupInfo.phoneNum}
                  onChange={(e) => {
                    setSignupInfo({ ...signupInfo, phoneNum: e.target.value });
                  }}
                  required
                />
                <button
                  type="button"
                  className="w-16 p-0 ml-2 bg-navy-basic text-white rounded-lg"
                  onClick={(e) => {
                    sendVerification();
                  }}
                >
                  인증
                </button>
              </div>
            </div>
            <div className="py-4 text-left">
              <label htmlFor="auth" className="font-bold">
                인증번호
              </label>
              <br />
              <input
                type="text"
                id="auth"
                className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
                placeholder="123456"
                onChange={(e) => {
                  // e.target.value랑 verification값이 같은지 확인
                  // 만약에 둘이 같으면, 가입하기 버튼을 활성화하고, 둘이 다르면 가입하기 버튼을 비활성화
                  const isVerificationMatched = e.target.value === verification;
                  setIsSubmitButtonEnabled(isVerificationMatched);
                }}
                required
              />
            </div>
            <div className="py-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="total_agree"
                  className="form-checkbox rounded-full bg-yellow-300"
                  checked={isChecked.every((item) => item)}
                  onChange={() => setIsChecked((prev) => prev.map(() => true))}
                  required
                />
                <label htmlFor="total_agree" className="ml-2 mb-2">
                  약관 전체동의
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  checked={isChecked[1]}
                  type="checkbox"
                  id="terms"
                  className="form-checkbox rounded-full bg-yellow-300"
                  onChange={() => toggleCheckbox(1)}
                  required
                />
                <label htmlFor="terms" className="ml-2">
                  서비스 이용약관 (필수)
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  checked={isChecked[2]}
                  type="checkbox"
                  id="privacy"
                  className="form-checkbox rounded-full bg-yellow-300"
                  onChange={() => toggleCheckbox(2)}
                  required
                />
                <label htmlFor="privacy" className="ml-2">
                  개인정보 수집 및 이용 (필수)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={isChecked[3]}
                  type="checkbox"
                  id="age_limit"
                  className="form-checkbox rounded-full bg-yellow-300"
                  onChange={() => toggleCheckbox(3)}
                  required
                />
                <label htmlFor="age_limit" className="ml-2">
                  만 14세 이상입니다.(필수)
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`py-4 mt-8 bg-navy-basic text-white ${
                  isSubmitButtonEnabled ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isSubmitButtonEnabled}
              >
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
