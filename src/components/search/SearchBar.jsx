import { useState } from "react";
import axios from "axios";

// Recoil
import { useSetRecoilState } from "recoil";
import { postsDataState } from "@recoil/postsDataState.jsx";

// 이미지
import TicketImg from "@assets/img_ticket.png";

const keywordList = [
  "야구",
  "축구",
  "농구",
  "고척 돔 야구장",
  "키움",
  "광주 챔피언스 필드",
  "KIA",
  "대구 라이온즈 파크",
  "삼성",
  "대전 이글스 파크",
  "한화",
  "부산 사직 야구장",
  "롯데",
  "수원 위즈 파크",
  "KT",
  "인천 SSG랜더스필드",
  "SSG",
  "잠실 야구장",
  "두산",
  "LG",
  "창원NC파크",
  "NC",
];

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 입력된 키워드
    const filteredSuggestions = value
      ? keywordList.filter((keyword) =>
          keyword
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      : [];

    setSuggestions(filteredSuggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]); // 선택 후 초기화
  };

  const handleCloseSuggestions = () => {
    setSuggestions([]);
  };

  const setPostsData = useSetRecoilState(postsDataState);

  const handleSearch = async () => {
    // 서버로 검색어를 전송 후 결과를 받아옴
    try {
      const response = await axios.get(
        `https://oriticket.link/posts/search?value=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPostsData(response.data.content);
      }
    } catch (error) {
      console.error(
        "Error fetching search results:",
        error
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center border-2 border-blue-950 rounded-xl w-full shadow-xl">
        <img
          src={TicketImg}
          alt="Ori-Ticket logo"
          className="w-16 h-16 rounded-l-md"
        />
        <input
          type="search"
          name="search"
          aria-label="검색 입력창"
          placeholder="검색어를 입력해 주세요."
          className="w-full h-16 p-3"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        ></input>
        <button
          className="w-16 h-16 bg-blue-950 rounded-none rounded-r-md"
          aria-label="검색 버튼"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
            fill="white"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="relative">
          <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-2 rounded-xl shadow-xl">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-xl"
                onClick={() =>
                  handleSelectSuggestion(suggestion)
                }
              >
                {suggestion}
              </li>
            ))}
            <button
              className="absolute right-0 mt-1 mr-2 p-2 bg-blue-950 text-white font-semibold shadow-xl"
              onClick={handleCloseSuggestions}
            >
              닫기
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}
