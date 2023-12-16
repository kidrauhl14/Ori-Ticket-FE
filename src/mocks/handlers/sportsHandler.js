// 위치정보: src/mocks/handlers/sportsHandler.js

import { http, HttpResponse } from "msw";

export const sportsHandler = [
  // 스포츠 조회
  http.get("/sports/list", () => {
    return HttpResponse.json([
      {
        sportsId: 1,
        sportsName: "야구",
      },
      {
        sportsId: 2,
        sportsName: "축구",
      },
      {
        sportsId: 3,
        sportsName: "농구",
      },
    ]);
  }),
];
