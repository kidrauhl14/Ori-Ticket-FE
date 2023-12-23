import React, { useState } from "react";

// 이미지
import AdminImg from "@assets/img_admin.png";

// 컴포넌트
import Navbar from "@components/common/Navbar.jsx";
import reportDummy from "@components/reportDummy.json";

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("post");

  const sortedData =
    selectedTab === "post"
      ? reportDummy.post.sort(
          (a, b) =>
            new Date(b.reported_at) -
            new Date(a.reported_at)
        )
      : reportDummy.trade.sort(
          (a, b) =>
            new Date(b.reported_at) -
            new Date(a.reported_at)
        );

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <Navbar />
      <div className="flex-col">
        {/* 검색창 */}
        <div className="flex items-center border-2 border-sky-basic rounded-xl w-full">
          <img
            src={AdminImg}
            alt="Admin logo"
            className="w-20 h-20 m-1 rounded-xl"
          />
          <input
            type="search"
            name="search"
            aria-label="검색어 입력"
            placeholder="접수자 또는 사유, 날짜"
            className="w-full h-20 mr-1 p-3 rounded-xl"
          ></input>
        </div>
        {/* 검색창끝 */}
        {/* 메뉴창 */}
        <div className="flex-col">
          <div className="flex justify-start my-2">
            <div
              onClick={() => handleTabChange("post")}
              className={`flex justify-center ml-1 w-40 font-bold text-lg border-2 border-sky-basic ${
                selectedTab === "post"
                  ? "bg-sky-basic text-white"
                  : "text-sky-basic"
              } rounded-xl cursor-pointer`}
            >
              판매글 신고
            </div>
            <div
              onClick={() => handleTabChange("trade")}
              className={`flex justify-center ml-1 w-40 font-bold text-lg border-2 border-sky-basic ${
                selectedTab === "trade"
                  ? "bg-sky-basic text-white"
                  : "text-sky-basic"
              } rounded-xl cursor-pointer`}
            >
              거래중 신고
            </div>
          </div>
          <div className="flex-col border-2 border-sky-basic text-sky-basic rounded-xl">
            <ul className="flex justify-between my-3">
              <li className="w-16 text-sm">번호</li>
              <li className="w-32 text-sm">접수자</li>
              <li className="w-32 text-sm">사유</li>
              <li className="w-32 text-sm">요청 날짜</li>
            </ul>
            <div className="flex-col  border-2 border-sky-basic text-sky-basic rounded-md">
              {sortedData.map((data, index) => (
                <ul
                  key={index}
                  className="flex justify-between my-2"
                >
                  <li className="w-16 text-sm">
                    {data[`report_${selectedTab}_id`]}
                  </li>
                  <li className="w-32 text-sm">
                    {data.report_id}
                  </li>
                  <li className="w-32 text-sm">
                    {data.reason}
                  </li>
                  <li className="w-32 text-sm">
                    {data.reported_at}
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
