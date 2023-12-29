import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "@components/common/Navbar.jsx";
import ReportBtn from "@assets/img_btn_report.png";
import { formatDate } from "@utils/formatDate.js";

export default function DetailPage() {
  const { salePostId } = useParams();
  const [detailData, setDetailData] = useState();
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://oriticket.link/posts?&id=${salePostId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      if (!response.data || !response.data.ticket) {
        throw new Error("Invalid data structure");
      }

      const newData = response.data;
      setDetailData(newData);
    } catch (error) {
      console.error("API 호출 중 에러가 발생했습니다:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mb-4">
        <span className="text-navy-basic font-extrabold text-4xl">
          티켓 상세정보
        </span>

        {error ? (
          <div>{error}</div>
        ) : (
          <div className="card-compact w-full my-6 bg-base-100 shadow-xl">
            {detailData && detailData.ticket && (
              <div className="card-body">
                <div className="flex">
                  <div className="text-xl font-extrabold pt-1">
                    {detailData.ticket.sportsName}
                  </div>
                  <div className="text-xl font-extrabold pt-1"></div>
                  <div className="text-2xl font-extrabold">
                    {detailData.ticket.stadiumName} [
                    {detailData.ticket.homeTeamName}] vs
                    {detailData.ticket.awayTeamName}
                  </div>
                </div>
                <h2 className="card-title text-3xl">{detailData.seatInfo}</h2>
                <p className="text-left text-base font-extrabold">
                  사용날짜: {formatDate(detailData.ticket.expirationAt)}
                </p>
                <p className="text-left text-base font-extrabold">
                  판매자 id: {detailData.memberId}
                </p>
                <p className="text-sm text-end justify-end">
                  정가: {detailData.ticket.originalPrice}
                </p>
                <p className="font-extrabold text-xl text-end">
                  수량: {detailData.ticket.quantity}장 판매가:
                  {detailData.ticket.salePrice}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-square btn-primary"
                    // onClick={() => handleAddToCart(data)}
                  >
                    <svg
                      id={`likeButton-${detailData.salePostId}`}
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
            )}
          </div>
        )}
      </div>
      <div className="flex">
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
            <label
              htmlFor="fake_item"
              className="font-extrabold text-navy-basic"
            >
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
          <div className="mr-4">
            <input
              type="checkbox"
              id="etc"
              className="form-checkbox rounded-full bg-yellow-300"
            />
            <label htmlFor="etc" className="font-extrabold text-navy-basic">
              기타
            </label>
          </div>
        </div>
        <button className="p-0">
          <img src={ReportBtn} className="w-24" />
        </button>
      </div>
    </div>
  );
}
