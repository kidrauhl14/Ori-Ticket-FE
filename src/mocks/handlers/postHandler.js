// 위치정보: src/mocks/handlers/postHandler.js

import { http, HttpResponse } from "msw";

export const postHandler = [
  // 티켓 등록
  http.post("/posts", () => {
    return HttpResponse.json([
      {
        postId: 2,
        memberId: 1,
        ticket: {
          sportsId: 2,
          stadiumId: 2,
          awayTeamId: 2,
          quantity: 1,
          salePrice: 1000,
          originalPrice: 3000,
          expirationAt: "2023-12-10T10:00:00",
          seatInfo: "A열 4석",
          imgUrl: "Image url",
          note: "비고입니다",
          successive: false,
        },
        saleStatus: "FOR_SALE",
        createdAt: "2023-12-08T21:42:22.4785606",
      },
    ]);
  }),

  // 티켓 삭제
  http.delete("/posts", () => {
    return HttpResponse.json([
      {
        state: "true",
        message: "판매글 삭제",
        data: {
          id: "1",
        },
      },
    ]);
  }),

  // 티겟 조회
  http.get("/posts", () => {
    return HttpResponse.json([
      {
        state: "true",
        message: "판매글 조회",
        data: {
          id: "1",
          title: "제목1",
          content: "내용1",
          regDate: "2023-11-24 21:37:00",
        },
      },
    ]);
  }),

  // 티켓 검색
  http.get("/posts/search", () => {
    return HttpResponse.json([
      {
        page: 1,
        size: 10,
        totalPage: 150,
        totalCount: 1496,
        data: [
          {
            id: 1,
            title: "잠실야구장",
            content: "내용1",
          },
          {
            id: 2,
            title: "홍천야구장",
            content: "내용2",
          },
        ],
      },
    ]);
  }),

  // 티겟 찜하기
  http.post("/posts/likes", () => {
    return HttpResponse.json([
      {
        state: "true",
        message: "판매글 찜하기",
        data: {
          postId: "1",
          memberId: "1",
        },
      },
    ]);
  }),
];
