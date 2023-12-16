// 위치정보: src/mocks/handlers/stadiumHandler.js

import { http, HttpResponse } from "msw";

export const stadiumHandler = [
  // 경기장 조회
  http.get("/stadium/list", () => {
    return HttpResponse.json([
      {
        stadiumId: 0,
        sportsId: 1,
        stadiumName: "경기장",
        homeTeamName: "홈팀",
      },
      {
        stadiumId: 1,
        sportsId: 1,
        stadiumName: "고척 돔 야구장",
        homeTeamName: "키움",
      },
      {
        stadiumId: 2,
        sportsId: 1,
        stadiumName: "광주 챔피언스 필드",
        homeTeamName: "KIA",
      },
      {
        stadiumId: 3,
        sportsId: 1,
        stadiumName: "대구 라이온즈 파크",
        homeTeamName: "삼성",
      },
      {
        stadiumId: 4,
        sportsId: 1,
        stadiumName: "대전 이글스 파크",
        homeTeamName: "한화",
      },
      {
        stadiumId: 5,
        sportsId: 1,
        stadiumName: "부산 사직 야구장",
        homeTeamName: "롯데",
      },
      {
        stadiumId: 6,
        sportsId: 1,
        stadiumName: "수원 위즈 파크",
        homeTeamName: "KT",
      },
      {
        stadiumId: 7,
        sportsId: 1,
        stadiumName: "인천 SSG랜더스필드",
        homeTeamName: "SSG",
      },
      {
        stadiumId: 8,
        sportsId: 1,
        stadiumName: "잠실 야구장",
        homeTeamName: "두산",
      },
      {
        stadiumId: 9,
        sportsId: 1,
        stadiumName: "잠실 야구장",
        homeTeamName: "LG",
      },
      {
        stadiumId: 10,
        sportsId: 1,
        stadiumName: "창원NC파크",
        homeTeamName: "LG",
      },
    ]);
  }),
];
