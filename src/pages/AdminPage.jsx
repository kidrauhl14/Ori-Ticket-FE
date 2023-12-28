import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import axios from "axios";

// 이미지
import AdminImg from "@assets/img_admin.png";

// 컴포넌트
import Navbar from "@components/common/Navbar.jsx";

// Recoil
import { useRecoilState } from "recoil";
import {
  sellReportDataState,
  tradeReportDataState,
} from "@recoil/reportDataState.jsx";

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // 신고 리스트
  const [sellReportData, setSellReportData] =
    useRecoilState(sellReportDataState);
  const [tradeReportData, setTradeReportData] =
    useRecoilState(tradeReportDataState);

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
            if (selectedTab === "sell") {
              fetchReportData(
                `https://oriticket.link/report/posts/search?&page=${page}`,
                setSellReportData
              );
            } else if (selectedTab === "trade") {
              fetchReportData(
                `https://oriticket.link/report/transactions/search?&page=${page}`,
                setTradeReportData
              );
            }
          }
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, selectedTab, page]
  );

  const fetchReportData = async (url, setData) => {
    try {
      setLoading(true);

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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

      setData((prevData) => {
        if (selectedTab === "sell") {
          return [...prevData, ...newData];
        } else if (selectedTab === "trade") {
          return [
            ...prevData,
            ...newData.map((item) => ({
              reportTransactionId: item.reportTransactionId,
              memberName: item.memberName,
              reason: item.reason,
              reportedAt: item.reportedAt,
              salePost: item.salePost,
            })),
          ];
        }
      });

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("Selected Tab:", selectedTab);
    // console.log("Sell Report Data:", sellReportData);
    // console.log("Trade Report Data:", tradeReportData);

    // 페이지가 바뀌면 데이터 초기화
    if (selectedTab === "sell") {
      setSellReportData([]);
    } else if (selectedTab === "trade") {
      setTradeReportData([]);
    }

    // 새로운 페이지로 데이터 가져오기
    setPage(1);
    setHasMore(true);
  }, [selectedTab]);

  useEffect(() => {
    // 초기 렌더링 시에 데이터 가져오기
    if (selectedTab === "sell") {
      fetchReportData(
        `https://oriticket.link/report/posts/search?&page=${page}`,
        setSellReportData
      );
    } else if (selectedTab === "trade") {
      fetchReportData(
        `https://oriticket.link/report/transactions/search?&page=${page}`,
        setTradeReportData
      );
    }
  }, [
    selectedTab,
    page,
    setSellReportData,
    setTradeReportData,
  ]);

  const reportData =
    selectedTab === "sell"
      ? sellReportData
      : tradeReportData;

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

  // 신고 사유에 따른 한글 텍스트 매핑
  const mapReasonToKorean = (reason) => {
    switch (reason) {
      case "Overpriced registration":
        return "정가 이상 등록";
      case "Suspected false information":
        return "허위 매물 의심";
      case "Inappropriate photo":
        return "부적절한 사진";
      case "Other issues":
        return "기타";
      case "Economic loss":
        return "금전 피해";
      case "Material loss":
        return "유효하지 않음";
      default:
        return reason;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex-col">
        {/* 검색창 */}
        <div className="flex items-center rounded-xl w-full mb-8 shadow-xl">
          <img
            src={AdminImg}
            alt="Admin logo"
            className="w-16 h-16 rounded-l-md"
          />
          <input
            type="search"
            name="search"
            aria-label="검색어 입력"
            placeholder="접수자 또는 사유, 날짜"
            className="w-full h-16 p-3 rounded-r-md"
          ></input>
        </div>
        {/* 검색창끝 */}
        {/* 메뉴창 */}
        <div className="flex-col">
          <div className="flex justify-between mb-4">
            <div
              onClick={() => handleTabChange("sell")}
              className={`flex justify-center ml-1 w-full py-1 font-bold text-lg shadow-xl ${
                selectedTab === "sell"
                  ? "bg-sky-basic text-white"
                  : "text-sky-basic bg-white"
              } rounded-xl cursor-pointer`}
            >
              판매글 신고
            </div>
            <div
              onClick={() => handleTabChange("trade")}
              className={`flex justify-center ml-1 w-full py-1 font-bold text-lg shadow-xl ${
                selectedTab === "trade"
                  ? "bg-sky-basic text-white"
                  : "text-sky-basic bg-white"
              } rounded-xl cursor-pointer`}
            >
              거래중 신고
            </div>
          </div>
          <div className="flex-col rounded-md shadow-xl py-2">
            <ul className="flex justify-between my-3">
              <li className="w-20 text-sm ml-2 bg-sky-basic text-white rounded-md py-1 shadow">
                신고 번호
              </li>
              <li className="w-32 text-sm bg-sky-basic text-white rounded-md py-1 shadow">
                접수자
              </li>
              <li className="w-32 text-sm bg-sky-basic text-white rounded-md py-1 shadow">
                사유
              </li>
              <li className="w-32 text-sm mr-2 bg-sky-basic text-white rounded-md py-1 shadow">
                신고 날짜
              </li>
            </ul>
            <div className="flex-col text-sky-basic rounded-md">
              {reportData.length > 0 &&
                reportData.map((data, index) => (
                  <ul
                    className="flex justify-between my-2 mx-2 rounded-md shadow py-1 border-1 border-gray-50"
                    ref={
                      index === reportData.length - 1
                        ? lastPostRef
                        : null
                    }
                    key={index}
                  >
                    <li className="w-20 text-sm text-sky-basic">
                      {selectedTab === "sell"
                        ? data.reportPostId
                        : data.reportTransactionId}
                    </li>
                    <li className="w-32 text-sm">
                      {data.memberName}
                    </li>
                    <li className="w-32 text-sm">
                      {mapReasonToKorean(data.reason)}
                    </li>
                    <li className="w-32 text-sm">
                      {formatDate(data.reportedAt)}
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
        {/* 메뉴창끝 */}
      </div>
    </div>
  );
}
