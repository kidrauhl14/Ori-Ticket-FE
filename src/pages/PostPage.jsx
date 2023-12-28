import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import axios from "axios";

import { useDropzone } from "react-dropzone";

// 이미지
import Exclamation from "@assets/img_exclamation.png";

// 컴포넌트
import Navbar from "@components/common/Navbar.jsx";

// 좌석 dummy
import seatDummy from "../seatSelect.json";

export default function PostPage() {
  // Mock API
  // 스포츠 리스트
  const [sportsData, setSportsData] = useState(null);
  useEffect(() => {
    async function fetchSportsData() {
      try {
        const response = await axios.get(
          "http://13.124.46.138:8080/sports/list",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // HTTP 상태코드가 200이 아닌 경우 에러 발생
        if (response.status !== 200) {
          throw new Error(
            `HTTP error! status: ${response.status}`
          );
        }

        // 응답 데이터를 state에 설정
        setSportsData(response.data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    }

    fetchSportsData();
  }, []);
  console.log(sportsData);

  // 경기장 리스트
  const [stadiumData, setStadiumData] = useState(null);
  useEffect(() => {
    async function fetchStadiumData() {
      try {
        const response = await axios.get(
          "http://13.124.46.138:8080/stadium/list",
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

        setStadiumData(response.data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    }

    fetchStadiumData();
  }, []);
  console.log(stadiumData);

  // 상대팀 리스트
  const [awayteamData, setAwayteamData] = useState(null);
  useEffect(() => {
    async function fetchAwayteamData() {
      try {
        const response = await axios.get(
          "http://13.124.46.138:8080/awayteam/list",
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

        setAwayteamData(response.data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    }

    fetchAwayteamData();
  }, []);
  console.log(awayteamData);

  // 좌석 리스트
  const [seatData, setSeatData] = useState(null);
  useEffect(() => {
    setSeatData(seatDummy);
  }, []);

  // 선택된 sportsId에 해당하는 경기장, 상대팀 데이터 가져오기
  const [filteredStadiums, setFilteredStadiums] = useState(
    []
  );
  const [filteredAwayteams, setFilteredAwayteams] =
    useState([]);
  const handleSportChange = (event) => {
    const selectedSportsId = event.target.value;
    const filteredStadiums = stadiumData.filter(
      (stadium) =>
        stadium.sportsId === parseInt(selectedSportsId)
    );
    setFilteredStadiums(filteredStadiums);
    const filteredAwayteams = awayteamData.filter(
      (awayteam) =>
        awayteam.sportsId === parseInt(selectedSportsId)
    );
    setFilteredAwayteams(filteredAwayteams);
  };
  // 선택된 stadiumId에 해당하는 좌석 데이터 가져오기
  const [filteredSeats, setFilteredSeats] = useState([]);
  const handleStadiumChange = (event) => {
    const selectedStadiumId = event.target.value;
    const filteredSeats = seatData.filter(
      (seat) =>
        seat.stadiumId === parseInt(selectedStadiumId)
    );
    setFilteredSeats(filteredSeats);
  };

  // Datepicker
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue) => {
    console.log("expirationDate", newValue);
    setValue(newValue);
  };
  // 티켓 만료 시간
  const [expirationHour, setExpirationHour] = useState("");
  const [expirationMinute, setExpirationMinute] =
    useState("");
  const handleExpirationHourChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    if (
      value === "" ||
      (Number(value) >= 0 && Number(value) <= 24)
    ) {
      setExpirationHour(value);
    }
  };
  const handleExpirationMinuteChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
    if (
      value === "" ||
      (Number(value) >= 0 && Number(value) <= 60)
    ) {
      setExpirationMinute(value);
    }
  };

  // 티켓 존, 열 제한
  const [zone, setZone] = useState("");
  const [line, setLine] = useState("");
  const handleZoneChange = (event) => {
    // 입력값을 대문자로 변경하고 정규 표현식을 사용하여 대문자 영문자와 숫자만 허용
    const newValue = event.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 2);
    // 입력 값을 상태에 업데이트
    setZone(newValue);
  };

  // Heat 입력 값 변경 시 호출되는 함수
  const handleLineChange = (event) => {
    // 정규 표현식을 사용하여 숫자만 허용
    const newValue = event.target.value
      .replace(/[^0-9]/g, "")
      .slice(0, 2);
    // 입력 값을 상태에 업데이트
    setLine(newValue);
  };

  // 선택사항 한글만 최대 20자
  const [note, setNote] = useState("");
  const handleNoteChange = (e) => {
    const value = e.target.value
      .replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "")
      .slice(0, 20);
    setNote(value);
  };

  // 티켓 수량, 가격 입력 숫자 제한
  const [quantity, setQuantity] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const handleQuantityChange = (e) => {
    // 숫자만 허용하고 최대 2 자리까지 입력 가능하도록 함
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 2);
    setQuantity(value);
  };
  const handleOriginalPriceChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);
    setOriginalPrice(value);
  };
  const handleSalePriceChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);
    setSalePrice(value);
  };

  // 연석 여부
  const [isCurb, setIsCurb] = useState(false);

  const handleSeatTypeChange = (event) => {
    const selectedSeatType = event.target.value;
    // curb가 선택되면 true, 그 외의 경우에는 false 반환
    const isSuccessive = selectedSeatType === "연석";
    setIsCurb(isSuccessive);
    // 어떤 작업을 수행하고 싶다면 여기에 추가
    console.log("isSuccessive:", isSuccessive);
  };

  // // 이미지 업로드 상태
  // const [images, setImages] = useState([]);

  // // Dropzone 설정
  // const { acceptedFiles, getRootProps, getInputProps } =
  //   useDropzone({
  //     accept: "image/*",
  //     onDrop: (acceptedFiles) => {
  //       setImages(acceptedFiles);
  //     },
  //   });

  // 등록하기
  const handleTicketRegistration = async () => {
    try {
      const checkRequiredFields = () => {
        if (
          !sportsData ||
          !filteredStadiums ||
          !filteredAwayteams ||
          !zone ||
          !line ||
          !filteredSeats ||
          !value.startDate ||
          !expirationHour ||
          !expirationMinute ||
          !quantity ||
          !originalPrice ||
          !salePrice
        ) {
          return false; // 하나라도 비어 있다면 false 반환
        }
        return true; // 모든 필수 항목이 채워져 있다면 true 반환
      };
      // 필수 항목이 비어 있는지 확인
      if (!checkRequiredFields()) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }
      // // 이미지 업로드
      // const formData = new FormData();
      // images.forEach((image, index) => {
      //   formData.append(`image${index + 1}`, image);
      // });

      // const uploadResponse = await axios.post(
      //   "YOUR_S3_UPLOAD_ENDPOINT",
      //   formData
      // );

      // // S3에 업로드된 이미지의 URL을 받아옴
      // const imageUrls = uploadResponse.data.imageUrls;

      const sportsId = `${
        sportsData.length > 0 ? sportsData[0].sportsId : ""
      }`;

      const stadiumId = `${
        filteredStadiums.length > 0
          ? filteredStadiums[0].stadiumId
          : ""
      }`;

      const awayTeamId = `${
        filteredAwayteams.length > 0
          ? filteredAwayteams[0].awayTeamId
          : ""
      }`;

      // 좌석 정보를 문자열로 구성
      const seatInfo = `${zone} ${line} ${
        filteredSeats.length > 0
          ? filteredSeats[0].seatSelect[0].seatName
          : ""
      }`;

      // Datepicker에서 선택된 날짜
      const expirationDate = value.startDate;
      // 입력 시간
      const expirationTime = `${expirationHour}:${expirationMinute}`;
      // expirationAt을 완성된 형태로 구성
      const expirationAt = expirationDate
        ? `${expirationDate}T${expirationTime}:00`
        : null;

      const response = await axios.post(
        "http://13.124.46.138:8080/posts",
        {
          memberId: "1",
          sportsId: sportsId,
          stadiumId: stadiumId,
          awayTeamId: awayTeamId,
          quantity: parseInt(quantity),
          salePrice: parseInt(salePrice),
          originalPrice: parseInt(originalPrice),
          expirationAt: expirationAt,
          isSuccessive: isCurb,
          seatInfo: seatInfo,
          imgUrl: "empty",
          note: note,
        }
      );

      // 서버 응답에 대한 정보를 클라이언트에서 확인
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
      console.log("Response Data:", response.data);

      console.log(response.data);
      // 서버 응답 처리
      if (response.status === 200) {
        console.log("티켓 등록 성공:", response.data);
        alert("티켓 등록 성공");
        window.location.href = "/";
      } else {
        console.error("티켓 등록 실패:", response.data);
        // 등록 실패 시 수행할 작업 추가
      }
    } catch (error) {
      // 에러 처리
      console.error("에러:", error.message);
      if (error.response) {
        console.error("응답 데이터:", error.response.data);
        console.error("응답 상태:", error.response.status);
        console.error("응답 헤더:", error.response.headers);
      } else if (error.request) {
        // 요청은 되었지만 응답이 받아지지 않은 경우
        console.error(
          "응답을 받지 못했습니다:",
          error.request
        );
      } else {
        // 요청 설정 중에 에러가 발생한 경우
        console.error("요청 설정 에러:", error.message);
      }
    }
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
            >
              <option disabled selected>
                선택
              </option>
              {sportsData &&
                sportsData.map((info, index) => (
                  <option key={index} value={info.sportsId}>
                    {info.sportsName}
                  </option>
                ))}
            </select>
            <select
              className="block appearance-none w-96 bg-white border-2 border-blue-950 hover:border-blue-950 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleStadiumChange}
            >
              <option disabled selected>
                스포츠 종목을 먼저 선택하세요.
              </option>
              {filteredStadiums &&
                filteredStadiums.map((info, index) => (
                  <option
                    key={index}
                    value={info.stadiumId}
                  >
                    {info.stadiumName}&nbsp;[
                    {info.homeTeamName}]
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* 카테고리 선택끝 */}
        {/* 좌석정보 */}
        <div className="flex-col mb-12">
          <div className="flex items-center mb-1">
            <p className="font-extrabold text-lg">
              좌석정보&nbsp;
            </p>
            <p className="font-extrabold text-lg text-yellow-basic">
              (필수)
            </p>
          </div>
          <div className="flex items-center mb-1">
            <input
              placeholder="예시: B2"
              className="mr-1 rounded-xl border-blue-950 border-2 w-32"
              onChange={handleZoneChange}
              value={zone}
            ></input>
            <p className="font-extrabold text-base mr-4">
              구역: (존/블럭)
            </p>
            <input
              placeholder="예시: 6"
              className="mr-1 rounded-xl border-blue-950 border-2 w-32"
              onChange={handleLineChange}
              value={line}
            ></input>
            <p className="font-extrabold text-base mr-4">
              열
            </p>
          </div>
          <div className="flex-col items-center mb-1">
            <div className="flex items-center">
              <p className="font-extrabold text-base text-right mr-8">
                좌석:
              </p>
              <select className="block appearance-none w-64 bg-white border-2 border-blue-950 hover:border-blue-950 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline">
                <option disabled selected>
                  경기장을 먼저 선택하세요.
                </option>
                {filteredSeats.map((info, index) => (
                  <React.Fragment key={index}>
                    {info.seatSelect &&
                      info.seatSelect.map(
                        (seat, seatIndex) => (
                          <option
                            key={seatIndex}
                            value={seat.seatName}
                          >
                            {seat.seatName}
                          </option>
                        )
                      )}
                  </React.Fragment>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <p className="font-extrabold text-base text-right mr-4">
                상대팀:
              </p>
              <select className="block appearance-none w-64 bg-white border-2 border-blue-950 hover:border-blue-950 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline">
                <option disabled selected>
                  스포츠 종목을 먼저 선택하세요.
                </option>
                {filteredAwayteams &&
                  filteredAwayteams.map((info, index) => (
                    <option
                      key={index}
                      value={info.awayTeamId}
                    >
                      {info.awayTeamName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex items-center mb-1">
            <input
              placeholder="선택사항: 추가 정보 입력(최대 20자)"
              className="mr-1 rounded-xl border-blue-950 border-2 w-full"
              onChange={handleNoteChange}
              value={note}
            ></input>
          </div>
          <div className="flex items-center mb-1">
            <img
              src={Exclamation}
              alt="느낌표"
              className="w-6 h-6 mr-1"
            ></img>
            <p className="font-extrabold text-sm">
              구매, 열, 선택사항에는 숫자와 영문을
              입력하셔야 거래 성사율을 높일 수 있습니다.
            </p>
          </div>
        </div>
        {/* 좌석 정보끝 */}
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
              onChange={handleExpirationHourChange}
              value={expirationHour}
            />
            <p className="mr-2 font-extrabold text-base">
              시
            </p>
            <input
              placeholder="00"
              className="mr-1 rounded-xl border-blue-950 border-2 w-16"
              onChange={handleExpirationMinuteChange}
              value={expirationMinute}
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
            onChange={handleQuantityChange}
            value={quantity}
          ></input>
          <p className="font-extrabold text-base mr-4">
            장
          </p>
          <input
            placeholder="정가 가격"
            className="mr-1 rounded-xl border-blue-950 border-2 w-32"
            onChange={handleOriginalPriceChange}
            value={originalPrice}
          ></input>
          <p className="font-extrabold text-base mr-4">
            원
          </p>
          <input
            placeholder="판매 가격"
            className="mr-1 rounded-xl border-blue-950 border-2 w-32"
            onChange={handleSalePriceChange}
            value={salePrice}
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
          <select
            className="block appearance-none w-32 mr-4 bg-white border-2 border-blue-950 hover:border-blue-950 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleSeatTypeChange}
          >
            <option>단석</option>
            <option>연석</option>
          </select>
        </div>
      </div>
      {/* 연석 여부끝 */}
      {/* 상품 이미지 */}
      {/* <div className="flex-col mb-16">
        <div className="flex items-center mb-1">
          <p className="font-extrabold text-lg">
            상품 이미지&nbsp;
          </p>
          <p className="font-extrabold text-lg text-yellow-basic">
            (필수)
          </p>
        </div>
        <div
          className="flex items-center mb-1"
          {...getRootProps()}
        >
          {images.map((file, index) => (
            <div
              key={index}
              className="w-32 h-32 items-center text-center pt-12 border-2 border-blue-950 rounded-xl mr-2"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`uploaded-${index}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
          <div className="w-32 h-32 items-center text-center pt-12 border-2 border-blue-950 rounded-xl">
            이미지첨부
          </div>
          <input {...getInputProps()} />
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
      </div> */}
      {/* 상품 이미지끝 */}
      <div>
        <button
          className="w-full border-2 border-blue-950 rounded-xl bg-blue-950 text-yellow-basic font-extrabold text-xl"
          onClick={handleTicketRegistration}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
