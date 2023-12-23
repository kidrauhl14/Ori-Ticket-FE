import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function SignupPage(){
  const { replace } = useNavigate();
  const [isChecked, setIsChecked] = useState([false,false,false,false]);

  // "등록할" 회원정보를 관리할 상태 객체
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    birthDate: "",
    phoneNum: "",
  });

  const toggleCheckbox = (index) => {
    const newChecked = [...isChecked];
    newChecked[index] = !newChecked[index];
    setIsChecked(newChecked);
  };

  const register = (e) => {
    e.preventDefault()
    axios
      .post("/members/signup", signupInfo)
      .then((res) => {
        // userInfo에 id값이 들어온다.
        replace("/");
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }

  return (
    <>
      <div className="w-64 lg:w-72 xl:w-80 2xl:w-96">
        <h1 className=" font-extrabold">회원가입</h1>
        <div className="grid-rows-6 w-full my-10">
          <form onSubmit={register} action="/members/signup" method="post">
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
                onChange={(newDate) => {
                  setSignupInfo({ ...signupInfo, birthDate: newDate });
                }}
                className="w-full"
                required
              />
            </div>
            <div className="py-4 text-left">
              <label htmlFor="phone">휴대폰 번호</label>
              <br />
              <input
                type="tel"
                name="phoneNum"
                id="phone"
                placeholder="하이픈(-) 제외한 숫자만 입력"
                className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
                value={signupInfo.phoneNum}
                onChange={(e) => {
                  setSignupInfo({ ...signupInfo, phoneNum: e.target.value });
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
              <div className="bg-pink-100 flex items-center mb-2">
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
                className="py-4 mt-8 bg-navy-basic text-white"
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
