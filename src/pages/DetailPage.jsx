import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useRecoilValue, useRecoilState} from "recoil";
import fetchPostsData from "@utils/fetchPostsData.jsx";
import {postsDataState} from "@recoil/postsDataState.jsx";
import Navbar from "@components/common/Navbar.jsx";
import ReportBtn from "@assets/img_btn_report.png"
import { formatDate } from "@utils/formatDate.js";

export default function DetailPage() {
  const { salePostId } = useParams();
  const numericSalePostId = Number(salePostId);

  const [postsData, setPostsData] = useRecoilState(postsDataState);

  const [filteredData, setFilteredData] = useState({});

    useEffect(() => {
      const loadData = async () => {
        try {
          await fetchPostsData(setPostsData); 
        } catch (error) {
          console.error("Fetching posts data failed:", error);
        }
      };

      loadData();
    }, [setPostsData]);

    useEffect(() => {
      if (postsData) {
        const data = postsData.find(
          (post) => post.salePostId === numericSalePostId
        );

        setFilteredData(data); // 찾은 데이터로 상태 업데이트
      }
    }, [postsData, numericSalePostId]); 

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mb-4">
        <h1 className="text-navy-basic font-extrabold text-5xl">ORI-TICKET</h1>
        <h1 className="text-navy-basic font-extrabold text-5xl">상품정보</h1>

        <div className="card-compact w-full my-4 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex">
              <div className="text-xl font-extrabold pt-1">
                {filteredData.sportsName}&nbsp;
              </div>
              <div className="text-xl font-extrabold pt-1">&gt;&nbsp;</div>
              <div className="text-2xl font-extrabold">
                {filteredData.stadiumName}&nbsp;[
                {filteredData.homeTeamName}] vs&nbsp;
                {filteredData.awayTeamName}
              </div>
            </div>
            <h2 className="card-title text-3xl">{filteredData.seatInfo}</h2>
            <p className="text-left text-base font-extrabold">
              사용날짜: {formatDate(filteredData.expirationAt)}
            </p>
            <p className="text-left text-base font-extrabold">
              판매자: {filteredData.memberName}
            </p>
            <p className="text-sm text-end justify-end">
              정가: {filteredData.originalPrice}
            </p>
            <p className="font-extrabold text-xl text-end">
              수량: {filteredData.quantity}장 &nbsp;&nbsp;판매가:&nbsp;
              {filteredData.salePrice}
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-square btn-primary"
                // onClick={() => handleAddToCart(data)}
              >
                <svg
                  id={`likeButton-${filteredData.salePostId}`}
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
              <button className="btn btn-primary">티켓 구매</button>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-end w-5/6 mr-4">
        <div className="mr-4">
          <input
            type="checkbox"
            id="over_price"
            className="form-checkbox rounded-full bg-yellow-300"
          />
          <label
            htmlFor="over_price"
            className="font-extrabold text-navy-basic"
          >
            정가 이상 등록
          </label>
        </div>
        <div className="mr-4">
          <input
            type="checkbox"
            id="fake_item"
            className="form-checkbox rounded-full bg-yellow-300"
          />
          <label htmlFor="fake_item" className="font-extrabold text-navy-basic">
            허위 매물 의심
          </label>
        </div>
        <div className="mr-4">
          <input
            type="checkbox"
            id="inappropriate_pic"
            className="form-checkbox rounded-full bg-yellow-300"
          />
          <label
            htmlFor="inappropriate_pic"
            className="font-extrabold text-navy-basic"
          >
            부적절한 사진
          </label>
        </div>
        <button className="p-0">
          <img src={ReportBtn} className="w-24" />
        </button>
      </div>
    </div>
  );
}
