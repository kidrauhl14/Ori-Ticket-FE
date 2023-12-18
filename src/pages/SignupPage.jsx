import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function SignupPage(){

  const { replace } = useNavigate();
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  // 회원정보를 관리할 상태 객체
  const [userInfo, setUserInfo] = useState({
    name: '',
    birthDate: '',
    phoneNum: '',
  });

  const register = () => {
    axios.post("/members/signup", userInfo).then((response)=>{
      localStorage.setItem("회원이름", response.data.user.nickname);
      localStorage.setItem('accessToken',response.data.accessToken);
      localStorage.setItem('refreshToken',response.data.refreshToken);
      replace("/");
    }).catch((error)=>{
      console.log('An error occurred:', error);
    })
  }

  return (
    <>
      <div className="w-64 lg:w-72 xl:w-80 2xl:w-96">
        <h1 className=" font-extrabold">회원가입</h1>
        <div className="grid-rows-6 w-full my-10">
          <form action="/members/signup" method="post">
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
                value={userInfo.name}
                onChange={(e) => {
                  setUserInfo.name(e.target.value);
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
                value={userInfo.birthDate}
                dateFormat="MM-dd-yyyy"
                id="birthdate"
                name="birthDate"
                onChange={(newDate) => {
                  setUserInfo({...userInfo, birthDate: newDate});
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
                value={userInfo.phoneNum}
                onChange={(e) => {
                  setUserInfo.phoneNum(e.target.value);
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
                  checked={isCheckedAll}
                  required
                />
                <label htmlFor="total_agree" className="ml-2 mb-2">
                  약관 전체동의
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  checked={isCheckedAll}
                  type="checkbox"
                  id="terms"
                  className="form-checkbox rounded-full bg-yellow-300"
                  required
                />
                <label htmlFor="terms" className="ml-2">
                  서비스 이용약관 (필수)
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  checked={isCheckedAll}
                  type="checkbox"
                  id="privacy"
                  className="form-checkbox rounded-full bg-yellow-300"
                  required
                />
                <label htmlFor="privacy" className="ml-2">
                  개인정보 수집 및 이용 (필수)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={isCheckedAll}
                  type="checkbox"
                  id="age_limit"
                  className="form-checkbox rounded-full bg-yellow-300"
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
                onClick={register}
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
