import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// 이미지
import Ticket from "@assets/img_ticket.png";

// 컴포넌트
import Navbar from "@components/common/Navbar.jsx";

// Recoil
import { useRecoilValue } from "recoil";
import {
  shoppingCartState,
  shoppingCartTotalState,
} from "../store/shoppingCart";

// const saleTicket = [
//   {
//     sport_name: "야구",
//     team_name: "삼성",
//     stadium_name: "대구 라이온즈 파크",
//     seat_info: "7구역 b열 3층 1루 지정석",
//     use_date: "사용일: 11-25-2023 (Saturday)",
//     quantity: "1개",
//     original_price: "20,000",
//     sale_price: "20,000",
//     post_date: "11-25-2023",
//   },
//   {
//     sport_name: "야구",
//     team_name: "롯데",
//     stadium_name: "부산 사직 야구장",
//     seat_info: "35구역 e열 2층 2루 지정석",
//     use_date: "사용일: 11-23-2023 (Thursday)",
//     quantity: "1개",
//     original_price: "20,000",
//     sale_price: "17,000",
//     post_date: "11-25-2023",
//   },
// ];

export default function ProfilePage() {
  // 날짜를 년-월-일 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(
      "ko-KR",
      options
    );
  };

  // Recoil
  const shoppingCartTotal = useRecoilValue(
    shoppingCartTotalState
  );
  const shoppingCart = useRecoilValue(shoppingCartState);

  // 탭 메뉴
  const [selectedTab, setSelectedTab] = useState("sell");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-end mb-4">
        <Link to="/profile/edit">
          <button className="bg-blue-950 text-white font-semibold shadow-xl">
            정보수정
          </button>
        </Link>
      </div>
      <div className="flex-col">
        {/* 내 정보 */}
        <div className="flex-col mb-8">
          <div className="flex justify-between items-center w-full border-2 border-blue-950 rounded-xl shadow-xl mb-4">
            <img
              src={Ticket}
              alt="Ori-Ticket logo"
              className="w-16 h-16 rounded-l-md"
            ></img>
            <div className="font-extrabold text-3xl text-center py-3 px-24 h-16 w-full bg-white">
              나의 오리티켓
            </div>
            <div className="font-extrabold text-2xl text-center py-3 w-48 h-16 bg-blue-950 border-2 border-blue-950 rounded-r-md text-yellow-basic">
              김오리
            </div>
          </div>
          <div className="flex-col rounded-xl py-4 px-4 shadow-xl">
            <div className="flex items-center justify-between my-2">
              <div className="flex justify-center w-32 font-bold text-lg border-4 shadow-xl border-blue-950 bg-blue-950 text-white rounded-xl">
                경고 현황&nbsp;2
              </div>
              <div className="flex justify-between w-20 items-center">
                <div className="bg-blue-950 rounded-full w-5 h-5 shadow-xl">
                  &nbsp;
                </div>
                <div className="bg-blue-950 rounded-full w-5 h-5 shadow-xl">
                  &nbsp;
                </div>
                <div className="bg-sky-200 rounded-full w-5 h-5 shadow-xl">
                  &nbsp;
                </div>
              </div>
              <div className="font-bold text-sm border-4 shadow-xl border-blue-950 bg-blue-950 text-white rounded-xl px-2">
                경고를 한번 더 받으면 활동이 어려울 수
                있습니다.
              </div>
            </div>
            <div className="flex justify-center w-32 font-bold text-lg border-4 shadow-xl border-blue-950 bg-blue-950 text-white rounded-xl my-2">
              찜한 티켓&nbsp;{shoppingCartTotal}
            </div>
            <div className="flex justify-center w-32 font-bold text-lg border-4 shadow-xl border-blue-950 bg-blue-950 text-white rounded-xl my-2">
              거래 완료&nbsp;2
            </div>
          </div>
        </div>
        {/* 내 정보끝 */}
        {/* 찜한 티켓 */}
        <div className="flex-col mb-8">
          <div className="flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl border-blue-950 bg-blue-950 text-white rounded-xl">
            찜한 티켓
          </div>
          <div className="mt-4">
            {shoppingCart.length > 0 ? (
              shoppingCart.map((ticket, index) => (
                <div
                  className="card-compact w-full my-4 bg-base-100 shadow-xl"
                  key={index}
                >
                  <div className="card-body">
                    <div className="flex">
                      <div className="text-xl font-extrabold pt-1">
                        {ticket.sportsName}&nbsp;
                      </div>
                      <div className="text-xl font-extrabold pt-1">
                        &gt;&nbsp;
                      </div>
                      <div className="text-2xl font-extrabold">
                        {ticket.stadiumName}&nbsp;[
                        {ticket.homeTeamName}] vs&nbsp;
                        {ticket.awayTeamName}
                      </div>
                    </div>
                    <h2 className="card-title text-3xl">
                      {ticket.seatInfo}
                    </h2>
                    <p className="text-left text-base font-extrabold">
                      사용날짜:&nbsp;
                      {formatDate(ticket.expirationAt)}
                    </p>
                    <p className="text-sm text-end justify-end">
                      정가:&nbsp;{ticket.originalPrice}
                    </p>
                    <p className="font-extrabold text-xl text-end">
                      수량: {ticket.quantity}장&nbsp;&nbsp;
                      판매가:&nbsp;
                      {ticket.salePrice}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center text-gray-500 w-full py-4 bg-base-100 shadow-xl">
                비어 있습니다.
              </div>
            )}
          </div>
        </div>
        {/* 찜한 티켓끝 */}

        {/* 탭 리스트 수정필요 */}
        <div className="flex-col">
          <div className="flex justify-between">
            <div
              onClick={() => handleTabChange("sell")}
              className={`flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl ${
                selectedTab === "sell"
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-50 bg-white text-blue-950"
              } rounded-xl cursor-pointer`}
            >
              판매중
            </div>
            <div
              onClick={() => handleTabChange("sold")}
              className={`flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl ${
                selectedTab === "sold"
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-50 bg-white text-blue-950"
              } rounded-xl cursor-pointer`}
            >
              판매종료
            </div>
            <div
              onClick={() => handleTabChange("trade")}
              className={`flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl ${
                selectedTab === "trade"
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-50 bg-white text-blue-950"
              } rounded-xl cursor-pointer`}
            >
              거래중
            </div>
            <div
              onClick={() => handleTabChange("complete")}
              className={`flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl ${
                selectedTab === "complete"
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-50 bg-white text-blue-950"
              } rounded-xl cursor-pointer`}
            >
              거래종료
            </div>
          </div>
        </div>
        {/* 거래 완료 */}
        {/* <div className="flex-row mb-8">
          <div className="flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl border-blue-950 bg-blue-950 text-white rounded-xl">
            거래중
          </div>
          <div className="flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl border-blue-950 bg-blue-950 text-white rounded-xl">
            거래 완료
          </div>
          <div>
            {saleTicket.map((ticket, index) => (
              <div
                key={index}
                className="flex w-full h-full rounded-xl border-2 border-blue-950"
              >
                <div className="w-72">
                  <div className="flex m-2">
                    <p className="text-xs mr-1">
                      {ticket.sport_name}
                    </p>
                    <p className="text-xs font-extrabold mr-1">
                      &gt;
                    </p>
                    <p className="text-xs mr-1">
                      {ticket.team_name}
                    </p>
                    <p className="text-xs font-extrabold mr-1">
                      &gt;
                    </p>
                    <p className="text-xs">
                      {ticket.stadium_name}
                    </p>
                  </div>
                  <div className="flex-col m-2">
                    <div className="text-xl text-left font-extrabold">
                      {ticket.seat_info}
                    </div>
                    <div className="text-left font-semibold">
                      {ticket.use_date}
                    </div>
                  </div>
                </div>
                <div className="w-28 grid justify-center items-center text-sm">
                  {ticket.quantity}
                </div>
                <div className="w-28 flex-col">
                  <div className="text-sm text-end mt-6 pr-6 justify-end">
                    {ticket.original_price}
                  </div>
                  <div className="font-extrabold text-xl text">
                    {ticket.sale_price}
                  </div>
                </div>
                <div className="w-28 grid justify-center items-center text-sm">
                  {ticket.post_date}
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* 거래 완료끝 */}
      </div>
    </div>
  );
}
