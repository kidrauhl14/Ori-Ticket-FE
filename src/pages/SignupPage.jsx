import axios from "axios";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const signupRequest = async (userInfo) => {
    const response = await axios.post('/members/signup', userInfo);
    return response.data;
};

export default function SignupPage() {

  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const handleAllCheck = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo, 
      isCheckedAll: !prevUserInfo.isCheckedAll,
    }));
  };    

  // 회원정보를 관리할 상태 객체
  const [userInfo, setUserInfo] = useState({
    name: '',
    birthDate: null,
    phoneNum: '',
    isCheckedAll:false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "birthDate") {
      // Datepicker에서 startDate를 추출
      const { startDate } = e.date;

      setUserInfo((prevInfo) => ({
        ...prevInfo,
        [name]: startDate.toISOString(),
      }));
    } else {
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }    
  console.log(userInfo);
  }

  // const [value, setValue] = useState({
  //   startDate: null,
  //   endDate: null,
  // });

  //   const handleValueChange = (newValue) => {
  //   console.log("newValue:", newValue);
  //   setValue(newValue);
  // };

  return (
    <>
      <div className="w-64 lg:w-72 xl:w-80 2xl:w-96">
        <h1 className=" font-extrabold">회원가입</h1>
        <div className="grid-rows-6 w-full my-10">
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
              onChange={handleChange}
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
              onChange={handleChange}
              dateFormat="MM-dd-yyyy"
              id="birthdate"
              name="birthDate"
              className="w-full"
              required
            />
          </div>
          <div className="py-4 text-left">
            <label htmlFor="phone">휴대폰 번호</label>
            <br />
            <input
              type="text"
              name="phoneNum"
              id="phone"
              placeholder="하이픈(-) 제외한 숫자만 입력"
              className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
              value={userInfo.phoneNum}
              onChange={handleChange}
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
                onChange={handleAllCheck}
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
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
