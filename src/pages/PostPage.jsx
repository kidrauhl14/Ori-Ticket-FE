import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

// 이미지
import Exclamation from "@assets/img_exclamation.png";

// 컴포넌트
import Navbar from "@components/common/Navbar.jsx";
import categoryDummy from "@components/categoryDummy.json";

export default function PostPage() {
  // 스포츠 선택
  const [selectedSport, setSelectedSport] = useState("");
  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };
  const filteredStadiums = categoryDummy.stadiums.filter(
    (stadium) => stadium.sport_name === selectedSport
  );
  const filteredTeams = categoryDummy.teams.filter(
    (team) => team.sport_name === selectedSport
  );

  // Datepicker
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Navbar />
      <div className="font-extrabold text-5xl mb-20">
        티켓등록
      </div>
      <div className="flex-col">
        {/* 카테고리 선택 */}
        <div className="flex-col mb-12">
          <div className="flex items-center mb-1">
            <p className="font-extrabold text-lg">
              카테고리 선택&nbsp;
            </p>
            <p className="font-extrabold text-lg text-yellow-basic">
              (필수)
            </p>
          </div>
          <div className="flex relative justify-between">
            <select
              className="block appearance-none w-40 mr-4 bg-white border-2 border-blue-950 hover:border-blue-950 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleSportChange}
              value={selectedSport}
            >
              <option value="" disabled>
                선택
              </option>
              {categoryDummy.sports.map((sport, index) => (
                <option
                  key={index}
                  value={sport.sport_name}
                >
                  {sport.sport_name}
                </option>
              ))}
            </select>
            <select className="block appearance-none w-96 bg-white border-2 border-blue-950 hover:border-blue-950 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline">
              {filteredStadiums.map((stadium, index) => (
                <option key={index}>
                  {stadium.stadium_name}&nbsp;[
                  {stadium.home_team_name}]
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <p className="font-extrabold text-base text-right w-40 mr-4">
              상대팀:
            </p>
            <select className="block appearance-none w-64 bg-white border-2 border-blue-950 hover:border-blue-950 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline">
              {filteredTeams.map((team, index) => (
                <option key={index}>
                  {team.away_team_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 카테고리 선택끝 */}
        {/* 티켓 사용일시 */}
        <div className="flex-col mb-12">
          <div className="flex items-center mb-1">
            <p className="font-extrabold text-lg">
              티켓 사용일시&nbsp;
            </p>
            <p className="font-extrabold text-lg text-yellow-basic">
              (필수)
            </p>
          </div>
          <div className="flex items-center mb-2">
            <div className="mr-8 rounded-xl border-blue-950 border-2">
              <Datepicker
                useRange={false}
                asSingle={true}
                value={value}
                onChange={handleValueChange}
                displayFormat={"DD/MM/YYYY"}
              />
            </div>
            <input
              placeholder="00"
              className="mr-1 rounded-xl border-blue-950 border-2 w-16"
            />
            <p className="mr-2 font-extrabold text-base">
              시
            </p>
            <input
              placeholder="00"
              className="mr-1 rounded-xl border-blue-950 border-2 w-16"
            />
            <p className="font-extrabold text-base">분</p>
          </div>
          <div className="flex-col">
            <div className="flex items-center mb-1">
              <img
                src={Exclamation}
                alt="느낌표"
                className="w-6 h-6 mr-1"
              ></img>
              <p className="font-extrabold text-sm">
                사용일자가 종료되면 상품이 더이상 노출되지
                않습니다.
              </p>
            </div>
            <div className="flex items-center">
              <img
                src={Exclamation}
                alt="느낌표"
                className="w-6 h-6 mr-1"
              ></img>
              <p className="font-extrabold text-sm">
                사용일시를 정확히 선택하여야 구매자와의
                분쟁을 방지할 수 있습니다.
              </p>
            </div>
            <p className="font-extrabold text-sm text-left pl-6">
              (사용기간까지 정확히 입력해 주세요)
            </p>
          </div>
        </div>
        {/* 티켓 사용일시끝 */}
      </div>
      {/* 티켓 가경정보 */}
      <div className="flex-col mb-12">
        <div className="flex items-center mb-1">
          <p className="font-extrabold text-lg">
            티켓 가격정보&nbsp;
          </p>
          <p className="font-extrabold text-lg text-yellow-basic">
            (필수)
          </p>
        </div>
        <div className="flex items-center mb-1">
          <input
            placeholder="전체 수량"
            className="mr-1 rounded-xl border-blue-950 border-2 w-32"
          ></input>
          <p className="font-extrabold text-base mr-4">
            장
          </p>
          <input
            placeholder="정가 가격"
            className="mr-1 rounded-xl border-blue-950 border-2 w-32"
          ></input>
          <p className="font-extrabold text-base mr-4">
            원
          </p>
          <input
            placeholder="판매 가격"
            className="mr-1 rounded-xl border-blue-950 border-2 w-32"
          ></input>
          <p className="font-extrabold text-base mr-4">
            원
          </p>
        </div>
        <div className="flex items-center mb-1">
          <img
            src={Exclamation}
            alt="느낌표"
            className="w-6 h-6 mr-1"
          ></img>
          <p className="font-extrabold text-sm">
            상품수량은 일괄로 한번에 판매 됩니다.
          </p>
        </div>
        <div className="flex items-center">
          <img
            src={Exclamation}
            alt="느낌표"
            className="w-6 h-6 mr-1"
          ></img>
          <p className="font-extrabold text-sm">
            정가이하로 판매하세요. 정가이상으로 등록 시
            이용제한이 발생할 수 있습니다.
          </p>
        </div>
      </div>
      {/* 티켓 가경정보끝 */}
      {/* 연석 여부 */}
      <div className="flex-col mb-12">
        <div className="flex items-center mb-1">
          <p className="font-extrabold text-lg">
            연석 여부&nbsp;
          </p>
          <p className="font-extrabold text-lg text-yellow-basic">
            (필수)
          </p>
        </div>
        <div className="flex">
          <select className="block appearance-none w-32 mr-4 bg-white border-2 border-blue-950 hover:border-blue-950 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>단석</option>
            <option>연석</option>
          </select>
        </div>
      </div>
      {/* 연석 여부끝 */}
      {/* 상품 이미지 */}
      <div className="flex-col mb-16">
        <div className="flex items-center mb-1">
          <p className="font-extrabold text-lg">
            상품 이미지&nbsp;
          </p>
          <p className="font-extrabold text-lg text-yellow-basic">
            (필수)
          </p>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-32 h-32 items-center text-center pt-12 border-2 border-blue-950 rounded-xl mr-2">
            이미지첨부
          </div>
          <div className="w-32 h-32 items-center text-center pt-12 border-2 border-blue-950 rounded-xl mr-2">
            이미지첨부
          </div>
          <div className="w-32 h-32 items-center text-center pt-12 border-2 border-blue-950 rounded-xl">
            이미지첨부
          </div>
        </div>
        <div className="flex items-center mb-1">
          <img
            src={Exclamation}
            alt="느낌표"
            className="w-6 h-6 mr-1"
          ></img>
          <p className="font-extrabold text-sm">
            업로드 이미지 저작권 및 초상권 관련 책임은
            게시자 본인에게 있습니다.
          </p>
        </div>
      </div>
      {/* 상품 이미지끝 */}
      <div>
        <button className="w-full border-2 boder-blue-950 rounded-xl bg-blue-950 text-yellow-basic font-extrabold text-xl">
          등록하기
        </button>
      </div>
    </div>
  );
}
