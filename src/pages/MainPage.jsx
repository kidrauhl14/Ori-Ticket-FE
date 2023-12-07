import { Link } from "react-router-dom";

// 이미지
import BaseballImg from "@assets/img_baseball.png";
import SoccerImg from "@assets/img_soccer.png";
import BasketballImg from "@assets/img_basketball.png";

// 컴포넌트
import Navbar from "@components/common/Navbar.jsx";
import SearchBar from "@components/search/SearchBar.jsx";

const categories = [
  { img: BaseballImg, alt: "야구 카테고리", label: "야구" },
  { img: SoccerImg, alt: "축구 카테고리", label: "축구" },
  {
    img: BasketballImg,
    alt: "농구 카테고리",
    label: "농구",
  },
];

const categoryLabelMap = {
  야구: "baseball",
  축구: "soccer",
  농구: "basketball",
};

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

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <div className="flex max-w-5xl mb-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="justify-center h-full w-full"
          >
            <Link
              to={`/category/${
                categoryLabelMap[category.label]
              }`}
            >
              <button className="p-0 rounded-xl mx-6">
                <img
                  src={category.img}
                  alt={category.alt}
                  className="flex justify-center h-full w-full rounded-xl"
                />
              </button>
            </Link>

            <p className="mb-4 font-extrabold text-base">
              {category.label}
            </p>
          </div>
        ))}
      </div>
      <SearchBar />
      <div className="w-full h-full mt-8 rounded-xl border-2 border-blue-950">
        <ul className="flex justify-between my-4">
          <li className="w-72 text-sm">상품정보</li>
          <li className="w-28 text-sm">수량</li>
          <li className="w-28 text-sm">가격</li>
          <li className="w-28 text-sm">등록일</li>
        </ul>
        <div>
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="flex w-full h-full rounded-xl border-2 border-blue-950 mt-1"
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
      </div>
    </div>
  );
}
