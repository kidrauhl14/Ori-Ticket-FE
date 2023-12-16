import { useState, useEffect } from "react";
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

export default function MainPage() {
  // 판매글 리스트
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    async function fetchPostsData() {
      try {
        const response = await fetch("/posts/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        setPostsData(data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    }

    fetchPostsData();
  }, []);
  console.log(postsData);

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
      <div className="mt-8">
        <Link to={`/post`}>
          <div className="w-full py-2 border-2 border-blue-950 rounded-xl bg-blue-950 text-yellow-basic font-extrabold text-xl">
            티켓 판매 등록
          </div>
        </Link>
      </div>
      <div className="w-full h-full mt-8 rounded-xl border-2 border-blue-950">
        <ul className="flex justify-between my-4">
          <li className="w-72 text-sm">상품정보</li>
          <li className="w-28 text-sm">수량</li>
          <li className="w-28 text-sm">가격</li>
          <li className="w-28 text-sm">등록일</li>
        </ul>
        <div>
          {postsData.length > 0 && // 조건부 렌더링 추가
            postsData.map((data, index) => (
              <div
                key={index}
                className="flex w-full h-full rounded-xl border-2 border-blue-950 mt-1"
              >
                <div className="w-72">
                  <div className="flex m-2">
                    <p className="text-xs mr-1">
                      {data.content.length > 0 &&
                        data.content[0].sportsName}
                    </p>
                    <p className="text-xs font-extrabold mr-1">
                      &gt;
                    </p>
                    <p className="text-xs mr-1">
                      {data.content.length > 0 &&
                        data.content[0].homeTeamName}
                    </p>
                    <p className="text-xs font-extrabold mr-1">
                      &gt;
                    </p>
                    <p className="text-xs">
                      {data.content.length > 0 &&
                        data.content[0].stadiumName}
                    </p>
                  </div>
                  <div className="flex-col m-2">
                    <div className="text-xl text-left font-extrabold">
                      {data.content.length > 0 &&
                        data.content[0].seatInfo}
                    </div>
                    <div className="text-left font-semibold">
                      {data.content.length > 0 &&
                        formatDate(
                          data.content[0].expirationAt
                        )}
                    </div>
                  </div>
                </div>
                <div className="w-28 grid justify-center items-center text-sm">
                  {data.content.length > 0 &&
                    data.content[0].quantity}
                </div>
                <div className="w-28 flex-col">
                  <div className="text-sm text-end mt-6 pr-6 justify-end">
                    {data.content.length > 0 &&
                      data.content[0].originalPrice}
                  </div>
                  <div className="font-extrabold text-xl text">
                    {data.content.length > 0 &&
                      data.content[0].salePrice}
                  </div>
                </div>
                <div className="w-28 grid justify-center items-center text-sm">
                  {data.content.length > 0 &&
                    formatDate(data.content[0].createdAt)}
                </div>
              </div>
            ))}
        </div>
        <div className="card-compact w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p className="">
              If a dog chews shoes whose shoes does he
              choose?
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
