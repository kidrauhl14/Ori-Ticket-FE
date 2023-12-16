// 위치정보: src/mocks/handlers/awayteamHandler.js

import { http, HttpResponse } from "msw";

export const awayteamHandler = [
  // 경기장 조회
  http.get("/awayteam/list", () => {
    return HttpResponse.json([
      {
        awayTeamId: 1,
        sportsId: 1,
        awayTeamName: "키움",
      },
      {
        awayTeamId: 2,
        sportsId: 1,
        awayTeamName: "KIA",
      },
      {
        awayTeamId: 3,
        sportsId: 1,
        awayTeamName: "삼성",
      },
      {
        awayTeamId: 4,
        sportsId: 1,
        awayTeamName: "한화",
      },
      {
        awayTeamId: 5,
        sportsId: 1,
        awayTeamName: "롯데",
      },
      {
        awayTeamId: 6,
        sportsId: 1,
        awayTeamName: "KT",
      },
      {
        awayTeamId: 7,
        sportsId: 1,
        awayTeamName: "SSG",
      },
      {
        awayTeamId: 8,
        sportsId: 1,
        awayTeamName: "두산",
      },
      {
        awayTeamId: 9,
        sportsId: 1,
        awayTeamName: "LG",
      },
      {
        awayTeamId: 10,
        sportsId: 1,
        awayTeamName: "LG",
      },
    ]);
  }),
];
