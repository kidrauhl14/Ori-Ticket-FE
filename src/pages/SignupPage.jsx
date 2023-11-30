import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function SignupPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  }); 

  const handleAllCheck =() => {
    setIsCheckedAll(!isCheckedAll);
  }


  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  } 
  return (
    <>
      <div className="w-52 lg:w-72 xl:w-80 2xl:w-96">
        <h1 className=" font-extrabold">회원가입</h1>
        <div className="grid-rows-6 w-full my-10">
          <div className="py-4 text-left">
            <label htmlFor="username" className="font-bold">
              이름
            </label>
            <br />
            <input
              type="text"
              name="username"
              id="username"
              className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
              placeholder="김오리"
              required
            />
          </div>
          <div className="py-4 text-left">
            <label htmlFor="email">이메일</label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="oriticket@gmail.com"
              className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
              required
            />
          </div>
          <div className="py-4 text-left w-full">
            <label htmlFor="birthdate">생년월일</label>
            <br />
            <Datepicker
              primaryColor={"indigo"}
              asSingle={true}
              value={value}
              onChange={handleValueChange}
              dateFormat="yyyy-MM-dd"
              id="birthdate"
              name="birthdate"
              className="w-full"
              required
            />
          </div>
          <div className="py-4 text-left">
            <label htmlFor="phone">휴대폰 번호</label>
            <br />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="하이픈(-) 제외한 숫자만 입력"
              className="w-full appearance-none border border-4 rounded-lg border-navy-basic text-gray-700 placeholder-gray-400 focus:border-transparent"
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
            <button type="submit" className="py-4 mt-8 bg-navy-basic text-white">
              가입하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
