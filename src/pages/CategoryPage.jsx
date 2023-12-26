import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import fetchPostsData from "@utils/fetchPostsData.jsx";
import useAxios from '@hooks/useAxios.jsx';
import {formatDate} from "@utils/formatDate.js"
import { useRecoilState } from "recoil";
import {postsDataState} from "@recoil/postsDataState.jsx";
// import { shoppingCartState, likeItemState } from "../store/shoppingCart";

import Navbar from '@components/common/Navbar.jsx'
import DoubleSeatBtn from '@assets/img_btn_double.png'
import BaseballImg from "@assets/img_baseball.png";
import SoccerImg from "@assets/img_soccer.png";
import BasketballImg from "@assets/img_basketball.png";
import TicketImg from "@assets/img_ticket.png";

export default function CategoryPage() {
  const { category } = useParams();

  const [postsData, setPostsData] = useRecoilState(postsDataState);
  const [filteredData, setFilteredData] = useState([]);

    const sportsNameMapping = {
      baseball: "야구",
      soccer: "축구",
      basketball: "농구",
    };

  useEffect(() => {
    fetchPostsData(setPostsData);
  }, [setPostsData]);

  useEffect(() => {
    // 카테고리에 해당하는 스포츠 이름을 매핑 객체에서 가져옴
    const sportsName = sportsNameMapping[category];

    // postsData를 필터링하여 해당 스포츠 이름과 일치하는 데이터만 추출
    const filtered = postsData.filter((post) => post.sportsName === sportsName);

    // 필터링된 데이터로 상태 업데이트
    setFilteredData(filtered);
    console.log(filteredData);
  }, [postsData, category]); // postsData 또는 category가 변경될 때마다 실행

  const categories = [
    { img: BaseballImg, alt: "야구 카테고리", label: "야구" },
    { img: SoccerImg, alt: "축구 카테고리", label: "축구" },
    { img: BasketballImg, alt: "농구 카테고리", label: "농구" },
  ];

  // // Recoil 찜하기
  // const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);
  // const [likeItems, setLikeItems] = useRecoilState(likeItemState);

  // // Recoil 찜하기에 추가 및 삭제
  // const handleAddToCart = (ticket) => {
  //   const currentCart = [...shoppingCart];
  //   const existingIndex = currentCart.findIndex(
  //     (item) => item.salePostId === ticket.salePostId
  //   );

  //   if (existingIndex !== -1) {
  //     // 이미 존재하면 제거
  //     currentCart.splice(existingIndex, 1);
  //     // 아이템 좋아요 취소
  //     setLikeItems(
  //       likeItems.filter((item) => item.salePostId !== ticket.salePostId)
  //     );
  //   } else {
  //     // 존재하지 않으면 추가
  //     currentCart.push(ticket);
  //     // 아이템 좋아요 추가
  //     setLikeItems([...likeItems, ticket]);
  //   }

  //   setShoppingCart(currentCart);

  //   // Local Storage에 찜한 목록 저장
  //   localStorage.setItem("shoppingCart", JSON.stringify(currentCart));

  //   setShoppingCart(currentCart);
  // };

  // useEffect(() => {
  //   // 페이지가 로드될 때 Local Storage에서 찜한 목록을 불러옴
  //   const storedCart = localStorage.getItem("shoppingCart");
  //   if (storedCart) {
  //     setShoppingCart(JSON.parse(storedCart));
  //   }
  // }, [setShoppingCart]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <img src={BaseballImg} className="border rounded-lg" />
        <div className="text-7xl font-extrabold ml-4">
          {category === "baseball" && "야구"}
          {category === "soccer" && "축구"}
          {category === "basketball" && "농구"}
        </div>
      </div>
      <div className="flex flex-col">
        <button className="p-0 w-1/6 mb-4 justify-start">
          <img src={DoubleSeatBtn} />
        </button>
        <div className="bg-white flex max-w-5xl mb-4">
          <div className="navbar bg-navy-basic flex rounded-box">
            <div className="text-white">
              <img
                src={TicketImg}
                className="border-none rounded-xl w-12 h-12"
              />
            </div>
            <div className="text-white text-base mx-4 text-lg font-extrabold">
              {category === "baseball" && "야구"}
              {category === "soccer" && "축구"}
              {category === "basketball" && "농구"}
            </div>
            <div className="bg-white flex justify-between flex-1 px-2 border rounded-md">
              <a className="text-slate-500 text-base text-lg font-extrabold">
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
                    className="dropdown-content z-[1] card card-compact w-96 p-0 shadow bg-white text-navy-basic"
                  >
                    <ul
                      tabIndex={0}
                      className="bg-base-200 grid grid-cols-3 gap-8 rounded-box "
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
                        <li key={index} className="col-span-2 w-full px-2 py-1">
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

        <div className="mt-8 shadow-lg">
          {filteredData.length > 0 &&
            filteredData.map((data) => (
              <Link
                to={{ pathname: `/detail/${data.salePostId}` }}
                className="text-navy-basic card-compact w-full my-4 bg-base-100 shadow-xl"
                key={data.salePostId}
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
                  <h2 className="card-title text-3xl">{data.seatInfo}</h2>
                  <p className="text-left text-base font-extrabold">
                    사용날짜: {formatDate(data.expirationAt)}
                  </p>
                  <p className="text-sm text-end justify-end">
                    정가: {data.originalPrice}
                  </p>
                  <p className="font-extrabold text-xl text-end">
                    수량: {data.quantity}장 &nbsp;&nbsp;판매가:&nbsp;
                    {data.salePrice}
                  </p>
                  <div className="card-actions justify-end">
                    {/* <button
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
                    </button> */}
                    <button className="btn btn-primary">티켓 구매</button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
