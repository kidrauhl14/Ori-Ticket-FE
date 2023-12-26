import Navbar from "@components/common/Navbar.jsx";
import Ticket from "@assets/img_ticket.png";

import ProfileEdit from "@components/ProfileEdit.jsx";

export default function ProfileEditPage() {
    
  return (
    <>
      <Navbar />
      <ProfileEdit />
      <div className="flex-col">
        <div className="flex-col mb-8">
          <div className="flex justify-between items-center w-full border-2 border-blue-950 rounded-xl">
            <div className="flex">
              <img
                src={Ticket}
                alt="로고"
                className="w-20 h-20 rounded-xl"
              ></img>
              <p className="font-extrabold text-3xl text-center py-5 px-24 h-20 w-full">
                나의 오리티켓
              </p>
            </div>
            <p className="font-extrabold text-2xl text-center py-6 px-6 bg-blue-950 border-2 border-blue-950 rounded-xl h-20 text-yellow-basic">
              김오리
            </p>
          </div>
        </div>

        <div className="border-navy-basic border-4 rounded-xl">
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

          <button>탈퇴하기</button>
        </div>
      </div>
    </>
  );
}
