import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Link } from "react-router-dom";

import axios from "axios";

// 이미지
import BaseballImg from "@assets/img_baseball.png";
import SoccerImg from "@assets/img_soccer.png";
import BasketballImg from "@assets/img_basketball.png";

// 컴포넌트
import Navbar from "@components/common/Navbar.jsx";
import SearchBar from "@components/search/SearchBar.jsx";

// Recoil
import { useRecoilState } from "recoil";
import {
  shoppingCartState,
  likeItemState,
} from "../store/shoppingCart";

const categories = [
  { img: BaseballImg, alt: "야구", label: "야구" },
  { img: SoccerImg, alt: "축구", label: "축구" },
  { img: BasketballImg, alt: "농구", label: "농구" },
];

const categoryLabelMap = {
  야구: "baseball",
  축구: "soccer",
  농구: "basketball",
};

export default function MainPage() {
  // 판매글 리스트
  const [postsData, setPostsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchPostsData();
          }
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchPostsData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://13.124.46.138:8080/posts/search?&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const newData = response.data.content;

      if (newData.length === 0) {
        setHasMore(false);
        return;
      }

      setPostsData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

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

  // Recoil 찜하기
  const [shoppingCart, setShoppingCart] = useRecoilState(
    shoppingCartState
  );
  const [likeItems, setLikeItems] =
    useRecoilState(likeItemState);

  // Recoil 찜하기에 추가 및 삭제
  const handleAddToCart = (ticket) => {
    const currentCart = [...shoppingCart];
    const existingIndex = currentCart.findIndex(
      (item) => item.salePostId === ticket.salePostId
    );

    if (existingIndex !== -1) {
      // 이미 존재하면 제거
      currentCart.splice(existingIndex, 1);
      // 아이템 좋아요 취소
      setLikeItems(
        likeItems.filter(
          (item) => item.salePostId !== ticket.salePostId
        )
      );
    } else {
      // 존재하지 않으면 추가
      currentCart.push(ticket);
      // 아이템 좋아요 추가
      setLikeItems([...likeItems, ticket]);
    }

    setShoppingCart(currentCart);

    // Local Storage에 찜한 목록 저장
    localStorage.setItem(
      "shoppingCart",
      JSON.stringify(currentCart)
    );

    setShoppingCart(currentCart);
  };

  useEffect(() => {
    // 페이지가 로드될 때 Local Storage에서 찜한 목록을 불러옴
    const storedCart = localStorage.getItem("shoppingCart");
    if (storedCart) {
      setShoppingCart(JSON.parse(storedCart));
    }
  }, [setShoppingCart]);

  // 찜하기 버튼의 색상을 업데이트하는 useEffect
  useEffect(() => {
    // 페이지가 처음 로드될 때는 실행되면 안 됨
    if (postsData.length > 0) {
      postsData.forEach((data) => {
        const likeButton = document.getElementById(
          `likeButton-${data.salePostId}`
        );
        if (likeButton) {
          likeButton.style.fill = shoppingCart.some(
            (item) => item.salePostId === data.salePostId
          )
            ? "currentColor"
            : "";
        }
      });
    }
  }, [postsData, shoppingCart]);

  return (
    <div>
      <Navbar />
      <div className="flex w-full mb-4">
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
              <button className="p-0 rounded-full">
                <img
                  src={category.img}
                  alt={category.alt}
                  className="flex justify-center h-full w-full rounded-full shadow-xl"
                />
              </button>
            </Link>
            <p className="mt-1 mb-4 font-extrabold text-xl">
              {category.label}
            </p>
          </div>
        ))}
      </div>
      <SearchBar />
      <div className="mt-8">
        <Link to={`/post`}>
          <div className="w-full py-2 border-2 border-blue-950 rounded-xl bg-blue-950 text-yellow-basic font-extrabold text-xl shadow-xl">
            티켓 판매 등록
          </div>
        </Link>
      </div>
      <div className="mt-8">
        {postsData.length > 0 &&
          postsData.map((data, index) => (
            <div
              className="card-compact w-full my-4 bg-base-100 shadow-xl"
              ref={
                index === postsData.length - 1
                  ? lastPostRef
                  : null
              }
              key={index}
            >
              <div className="card-body">
                <div className="flex">
                  <div className="text-xl font-extrabold pt-1">
                    {data.sportsName}&nbsp;
                  </div>
                  <div className="text-xl font-extrabold pt-1">
                    &gt;&nbsp;
                  </div>
                  <div className="text-2xl font-extrabold">
                    {data.stadiumName}&nbsp;[
                    {data.homeTeamName}] vs&nbsp;
                    {data.awayTeamName}
                  </div>
                </div>
                <h2 className="card-title text-3xl">
                  {data.seatInfo}
                </h2>
                <p className="text-left text-base font-extrabold">
                  사용날짜: {formatDate(data.expirationAt)}
                </p>
                <p className="text-sm text-end justify-end">
                  정가: {data.originalPrice}
                </p>
                <p className="font-extrabold text-xl text-end">
                  수량: {data.quantity}장
                  &nbsp;&nbsp;판매가:&nbsp;
                  {data.salePrice}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-square btn-primary"
                    onClick={() => handleAddToCart(data)}
                  >
                    <svg
                      id={`likeButton-${data.salePostId}`}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <button className="btn btn-primary text-base">
                    티켓 구매
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
