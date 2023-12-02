import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

import Navbar from '@components/common/Navbar.jsx'
import DoubleSeatBtn from '@assets/img_btn_double.png'
import BaseballImg from "@assets/img_baseball.png";
import SoccerImg from "@assets/img_soccer.png";
import BasketballImg from "@assets/img_basketball.png";
import TicketImg from "@assets/img_ticket.png";

export default function CategoryPage() {
  const {category} = useParams();

const categories = [
  { img: BaseballImg, alt: "야구 카테고리", label: "야구" },
  { img: SoccerImg, alt: "축구 카테고리", label: "축구" },
  { img: BasketballImg, alt: "농구 카테고리", label: "농구"},
];

const tickets = [
  {
    sport_name: "야구",
    team_name: "키움",
    stadium_name: "고척 돔 야구장",
    seat_info: "418구역 k열 4층 3루 지정석",
    use_date: "사용일: 11-27-2023 (Monday)",
    quantity: "1개",
    original_price: "20,000",
    sale_price: "18,000",
    post_date: "11-25-2023",
  },
  {
    sport_name: "야구",
    team_name: "삼성",
    stadium_name: "대구 라이온즈 파크",
    seat_info: "7구역 b열 3층 1루 지정석",
    use_date: "사용일: 11-25-2023 (Saturday)",
    quantity: "1개",
    original_price: "20,000",
    sale_price: "20,000",
    post_date: "11-25-2023",
  },
  {
    sport_name: "야구",
    team_name: "롯데",
    stadium_name: "부산 사직 야구장",
    seat_info: "35구역 e열 2층 2루 지정석",
    use_date: "사용일: 11-23-2023 (Thursday)",
    quantity: "1개",
    original_price: "20,000",
    sale_price: "17,000",
    post_date: "11-25-2023",
  },
];


  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <img src={BaseballImg} className="border rounded-lg" />
        <div className="text-7xl font-extrabold ml-4">{category}</div>
      </div>
      <div className="flex flex-col">
        <button className="p-0 w-1/6 mb-4 justify-start">
          <img src={DoubleSeatBtn} />
        </button>
        <div className="bg-white flex max-w-5xl mb-4">
          <div className="navbar bg-navy-basic flex rounded-box">
            {/* <img src={TicketImg} className="w-auto h-auto"/> */}
            <div className="text-white">TicketImg자리</div>
            <div className="bg-white flex justify-between flex-1 px-2 border rounded-md">
              <a className="btn btn-ghost rounded-btn text-slate-500 text-base font-extrabold">
                카테고리별 보기
              </a>
              <div>
                <div className="bg-slate-200 dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost rounded-btn"
                  >
                    <svg
                      width="24"
                      height="14"
                      viewBox="0 0 24 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97918 22.6066 1.3934C22.0208 0.807611 21.0711 0.807611 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807612 1.97918 0.807612 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 10L10.5 12L13.5 12L13.5 10L10.5 10Z"
                        fill="#4C5379"
                      />
                    </svg>
                  </div>

                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] card card-compact w-96 p-2 shadow bg-navy-basic text-navy-basic"
                  >
                    <ul
                      tabIndex={0}
                      className="bg-base-200 rounded-box w-52 mt-4"
                    >
                      {[
                        "키움 > 고척 돔 야구장",
                        "한화 > 대전 이글스 파크",
                        "SSG > 인천 SSG 랜더스필드",
                        "NC > 창원 NC파크",
                        "KIA > 광주 챔피언스 필드",
                        "롯데 > 부산 사직 야구장",
                        "두산 > 잠실 야구장",
                        "삼성 > 대구 라이온즈파크",
                        "KT > 수원 위즈파크",
                        "LG > 잠실 야구장",
                      ].map((item, index) => (
                        <li key={index} className="w-full px-2 py-1">
                          <a>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border-4 border-blue-950">
          <ul className="flex justify-between my-4">
            <li className="w-72 text-sm">상품정보</li>
            <li className="w-28 text-sm">수량</li>
            <li className="w-28 text-sm">가격</li>
            <li className="w-28 text-sm">등록일</li>
          </ul>
          <div>
            <Link to="/detail" className="text-navy-basic">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex w-full h-full rounded-xl border-2 border-blue-950 mt-1"
                >
                  <div className="w-72">
                    <div className="flex m-2 text-sm breadcrumbs">
                      <ul>
                        <li>
                          <a>{ticket.sport_name}</a>
                        </li>
                        <li>
                          <a>{ticket.team_name}</a>
                        </li>
                        <li>
                          <a>{ticket.stadium_name}</a>
                        </li>
                      </ul>
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
