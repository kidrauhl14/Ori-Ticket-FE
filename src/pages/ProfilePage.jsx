import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

export default function ProfilePage() {
  const navigate = useNavigate();

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

  // 탭 기눙
  const [selectedTab, setSelectedTab] = useState("selling");

  const handleTabChange = async (tab) => {
    setSelectedTab(tab);

    try {
      let response;

      if (tab === "selling") {
        response = await axios.get(
          `https://oriticket.link/members/${memberId}/posts?status=for_sale,trading`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSellingTickets(response.data);
      } else if (tab === "soldout") {
        response = await axios.get(
          `https://oriticket.link/members/${memberId}/posts?status=sold,reported`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSoldoutTickets(response.data);
      } else if (tab === "trading") {
        response = await axios.get(
          `https://oriticket.link/members/${memberId}/transactions?status=pending,received`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTradingTickets(response.data);
      } else if (tab === "traded") {
        response = await axios.get(
          `https://oriticket.link/members/${memberId}/transactions?status=completed,canceled`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTradedTickets(response.data);
      }

      if (response.status !== 200) {
        throw new Error(
          `서버 응답 오류: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        `${tab} 탭 정보를 불러오는 중 에러:`,
        error.message
      );
    }
  };

  // 판매 중인 티켓 정보를 담을 상태
  const [sellingTickets, setSellingTickets] = useState([]);
  // 판매 종료된 티켓 정보를 담을 상태
  const [soldoutTickets, setSoldoutTickets] = useState([]);

  // 사용자의 ID
  const [memberId, setMemberId] = useState("7");
  // const memberId = "1"; // memberId를 사용자의 실제 ID로 대체

    const handleWithdraw = async () => {
      try {
        const response = await axios.delete(
          `https://oriticket.link/members/withdraw?id=${memberId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("회원 탈퇴 성공");
          // 탈퇴 성공 시 로그인 페이지로 이동 또는 다른 작업 수행
          navigate("/login");
        } else {
          console.error(`서버 응답 오류: ${response.status}`);
        }
      } catch (error) {
        console.error("회원 탈퇴 중 에러:", error.message);
      }
    };

  useEffect(() => {
    // 판매 중인 티켓 정보를 가져오는 함수
    const fetchSellTickets = async () => {
      try {
        const response = await axios.get(
          `https://oriticket.link/members/${memberId}/posts?status=for_sale,trading`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(
            `서버 응답 오류: ${response.status}`
          );
        }

        setSellingTickets(response.data);
      } catch (error) {
        console.error(
          "판매 중인 티켓 정보를 불러오는 중 에러:",
          error.message
        );
      }
    };

    fetchSellTickets();
  }, [memberId]);

  const showSellTicketList = (tickets) => {
    return (
      <div className="mt-4">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <div
              className="card-compact w-full my-4 bg-base-100 shadow-xl"
              key={index}
            >
              <div className="card-body">
                <div className="flex">
                  <div className="text-xl font-extrabold pt-1">
                    {ticket.ticket.sportsName}&nbsp;
                  </div>
                  <div className="text-xl font-extrabold pt-1">
                    &gt;&nbsp;
                  </div>
                  <div className="text-2xl font-extrabold">
                    {ticket.ticket.stadiumName} [
                    {ticket.ticket.homeTeamName}] vs
                    {ticket.ticket.awayTeamName}
                  </div>
                </div>
                <h2 className="card-title text-3xl">
                  {ticket.ticket.seatInfo}
                </h2>
                <p className="text-left text-base font-extrabold">
                  사용날짜:{" "}
                  {formatDate(ticket.ticket.expirationAt)}
                </p>
                <p className="text-base text-end justify-end">
                  정가: {ticket.ticket.originalPrice}
                </p>
                <p className="font-extrabold text-xl text-end">
                  수량: {ticket.ticket.quantity}장 판매가:
                  {ticket.ticket.salePrice}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-2xl text-center text-gray-500 w-full py-4 bg-base-100 shadow-xl">
            해당하는 티켓이 없습니다.
          </div>
        )}
      </div>
    );
  };

  // 거래 중인 티켓 정보를 담을 상태
  const [tradingTickets, setTradingTickets] = useState([]);
  // 거래 종료된 티켓 정보를 담을 상태
  const [tradedTickets, setTradedTickets] = useState([]);

  useEffect(() => {
    // 거래 중인 티켓 정보를 가져오는 함수
    const fetchTradingTickets = async () => {
      try {
        const response = await axios.get(
          `https://oriticket.link/members/${memberId}/transactions?status=pending,received`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(
            `서버 응답 오류: ${response.status}`
          );
        }

        setTradingTickets(response.data);
      } catch (error) {
        console.error(
          "거래 중인 티켓 정보를 불러오는 중 에러:",
          error.message
        );
      }
    };

    // 거래 종료된 티켓 정보를 가져오는 함수
    const fetchTradedTickets = async () => {
      try {
        const response = await axios.get(
          `https://oriticket.link/members/${memberId}/transactions?status=completed,canceled`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(
            `서버 응답 오류: ${response.status}`
          );
        }

        setTradedTickets(response.data);
      } catch (error) {
        console.error(
          "거래 종료된 티켓 정보를 불러오는 중 에러:",
          error.message
        );
      }
    };

    fetchTradingTickets();
    fetchTradedTickets();
  }, [memberId]);

  const showTradingTicketList = (tickets) => {
    return (
      <div className="mt-4">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <div
              className="card-compact w-full my-4 bg-base-100 shadow-xl"
              key={index}
            >
              <div className="card-body">
                <div className="flex-col text-center">
                  <div className="flex mb-8">
                    <div className="text-xl font-extrabold pt-1 mr-8">
                      판매자: {ticket.sellerId}
                    </div>
                    <div className="text-xl font-extrabold pt-1">
                      구매자: {ticket.buyerId}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-left text-xl font-extrabold">
                      {ticket.status}
                    </div>
                    <div className="text-2xl font-extrabold">
                      금액: {ticket.payAmount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-2xl text-center text-gray-500 w-full py-4 bg-base-100 shadow-xl">
            해당하는 티켓이 없습니다.
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-end mb-4">
        <button
          className="bg-navy-basic text-white font-semibold ml-2 shadow-xl"
          onClick={handleWithdraw}
        >
          회원 탈퇴
        </button>
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
                경고를 한번 더 받으면 활동이 어려울 수 있습니다.
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
                    <h2 className="card-title text-3xl">{ticket.seatInfo}</h2>
                    <p className="text-left text-base font-extrabold">
                      사용날짜:&nbsp;
                      {formatDate(ticket.expirationAt)}
                    </p>
                    <p className="text-sm text-end justify-end">
                      정가:&nbsp;{ticket.originalPrice}
                    </p>
                    <p className="font-extrabold text-xl text-end">
                      수량: {ticket.quantity}장&nbsp;&nbsp; 판매가:&nbsp;
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
              onClick={() => handleTabChange("selling")}
              className={`flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl ${
                selectedTab === "selling"
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-50 bg-white text-blue-950"
              } rounded-xl cursor-pointer`}
            >
              판매중
            </div>
            <div
              onClick={() => handleTabChange("soldout")}
              className={`flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl ${
                selectedTab === "soldout"
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-50 bg-white text-blue-950"
              } rounded-xl cursor-pointer`}
            >
              판매종료
            </div>
            <div
              onClick={() => handleTabChange("trading")}
              className={`flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl ${
                selectedTab === "trading"
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-50 bg-white text-blue-950"
              } rounded-xl cursor-pointer`}
            >
              거래중
            </div>
            <div
              onClick={() => handleTabChange("traded")}
              className={`flex justify-center ml-1 w-32 font-bold text-lg border-4 shadow-xl ${
                selectedTab === "traded"
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-50 bg-white text-blue-950"
              } rounded-xl cursor-pointer`}
            >
              거래종료
            </div>
          </div>
          {/* 판매중인 티켓 리스트 */}
          {selectedTab === "selling" && showSellTicketList(sellingTickets)}
          {/* 판매종료 티켓 리스트 */}
          {selectedTab === "soldout" && showSellTicketList(soldoutTickets)}
          {/* 거래중인 티켓 리스트 */}
          {selectedTab === "trading" && showTradingTicketList(tradingTickets)}

          {/* 거래종료 티켓 리스트 */}
          {selectedTab === "traded" && showTradingTicketList(tradedTickets)}
        </div>
        {/* 거래 완료 */}
      </div>
    </div>
  );
}
