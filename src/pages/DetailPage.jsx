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
        throw new Error(
          `서버 응답 오류: ${response.status}`
        );
      }

      if (!response.data || !response.data.ticket) {
        throw new Error("잘못된 데이터 구조");
      }

      const newData = response.data;
      setDetailData(newData);
    } catch (error) {
      console.error(
        "API 호출 중 에러가 발생했습니다:",
        error.message
      );
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [salePostId]);

  // 결제 함수 추가
  const jsf__pay = (form) => {
    try {
      KCP_Pay_Execute_Web(form);
    } catch (e) {
      /* IE에서 결제 정상 종료시 throw로 스크립트 종료 */
    }
  };

  const handlePurchase = () => {
    // 여기에서 PC 결제 창을 호출하는 코드를 추가
    const orderInfoForm = document.createElement("form");
    orderInfoForm.name = "order_info";
    orderInfoForm.method = "post";

    const salePrice = detailData.ticket.salePrice;
    const salePostId = detailData.salePostId;
    const stadiumName = detailData.ticket.stadiumName;
    const homeTeamName = detailData.ticket.homeTeamName;
    const awayTeamName = detailData.ticket.awayTeamName;

    // 필요한 데이터 설정
    orderInfoForm.innerHTML = `
      <input type="hidden" name="ordr_idxx" value="Ori-Ticket"/>
      <input type="hidden" name="good_name" value="${salePostId}_${stadiumName}[${homeTeamName}]_${awayTeamName}"/>
      <input type="hidden" name="good_mny" value="${salePrice}"/>
      <input type="hidden" name="pay_method" value="100000000000"/> <!-- 결제수단(신용카드) -->
      <input type="hidden" name="site_cd" value="T0000"/>
      <input type="hidden" name="site_key" value="3grptw1.zW0GSo4PQdaGvsF__"/>
    `;

    document.body.appendChild(orderInfoForm);

    // 결제 창 호출
    jsf__pay(orderInfoForm);
  };

  // 신고 체크 박스
  const [checkboxState, setCheckboxState] = useState({
    overpriced_registration: false,
    suspected_false_information: false,
    inappropriate_photo: false,
    other_issues: false,
  });

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxState((prevState) => ({
      ...Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === checkboxName;
        return acc;
      }, {}),
    }));
  };

  // 신고하기
  const handleReport = async () => {
    const selectedReason = Object.keys(checkboxState).find(
      (key) => checkboxState[key]
    );

    console.log(selectedReason);

    try {
      const response = await axios.post(
        `https://oriticket.link/posts/${salePostId}/report`,
        {
          memberId: "3",
          reason: selectedReason,
        }
      );

      // 성공적으로 신고 요청이 처리된 경우의 처리
      console.log(
        "신고 요청이 성공했습니다.",
        response.data
      );
      alert("신고 되었습니다.");
      window.location.href = "/";
    } catch (error) {
      // 오류 발생 시의 처리
      console.error(
        "신고 요청 중 오류가 발생했습니다.",
        error.message
      );
    }
  };

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
                    {detailData.ticket.sportsName}&nbsp;
                  </div>
                  <div className="text-xl font-extrabold pt-1">
                    &gt;&nbsp;
                  </div>
                  <div className="text-2xl font-extrabold">
                    {detailData.ticket.stadiumName}&nbsp;[
                    {detailData.ticket.homeTeamName}]
                    vs&nbsp;
                    {detailData.ticket.awayTeamName}
                  </div>
                </div>
                <h2 className="card-title text-3xl">
                  {detailData.ticket.seatInfo}
                </h2>
                <p className="text-left text-base font-extrabold">
                  사용날짜:{" "}
                  {formatDate(
                    detailData.ticket.expirationAt
                  )}
                </p>
                <p className="text-sm text-end justify-end">
                  정가: {detailData.ticket.originalPrice}
                </p>
                <p className="font-extrabold text-xl text-end">
                  수량: {detailData.ticket.quantity}장
                  &nbsp;&nbsp;판매가:&nbsp;
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
                  <button
                    className="btn btn-primary"
                    onClick={handlePurchase}
                  >
                    구매 하기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex">
        <div className="ml-auto flex items-center justify-between w-5/6 mr-4">
          <div className="mr-2">
            <input
              type="checkbox"
              id="Overpriced registration"
              className="form-checkbox rounded-full bg-yellow-300 mr-2"
              checked={
                checkboxState.overpriced_registration
              }
              onChange={() =>
                handleCheckboxChange(
                  "overpriced_registration"
                )
              }
              value="overpriced_registration"
            />
            <label
              htmlFor="Overpriced registration"
              className="font-extrabold text-navy-basic"
            >
              정가 이상 등록
            </label>
          </div>
          <div className="mr-2">
            <input
              type="checkbox"
              id="Suspected false information"
              className="form-checkbox rounded-full bg-yellow-300 mr-2"
              checked={
                checkboxState.suspected_false_information
              }
              onChange={() =>
                handleCheckboxChange(
                  "suspected_false_information"
                )
              }
              value="suspected_false_information"
            />
            <label
              htmlFor="Suspected false information"
              className="font-extrabold text-navy-basic"
            >
              허위 매물 의심
            </label>
          </div>
          <div className="mr-2">
            <input
              type="checkbox"
              id="Inappropriate photo"
              className="form-checkbox rounded-full bg-yellow-300 mr-2"
              checked={checkboxState.inappropriate_photo}
              onChange={() =>
                handleCheckboxChange("inappropriate_photo")
              }
              value="inappropriate_photo"
            />
            <label
              htmlFor="Inappropriate photo"
              className="font-extrabold text-navy-basic"
            >
              부적절한 사진
            </label>
          </div>
          <div className="mr-2">
            <input
              type="checkbox"
              id="Other issues"
              className="form-checkbox rounded-full bg-yellow-300 mr-2"
              checked={checkboxState.other_issues}
              onChange={() =>
                handleCheckboxChange("other_issues")
              }
              value="other_issues"
            />
            <label
              htmlFor="Other issues"
              className="font-extrabold text-navy-basic"
            >
              기타
            </label>
          </div>
        </div>
        <button
          className="p-0 w-24 h-2"
          onClick={handleReport}
        >
          <img src={ReportBtn} className="w-full" />
        </button>
      </div>
    </div>
  );
}
