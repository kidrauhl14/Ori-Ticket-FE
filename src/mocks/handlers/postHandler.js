// 위치정보: src/mocks/handlers/postHandler.js

import { http, HttpResponse } from "msw";

export const postHandler = [
  // 판매글 등록
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

  // 판매글 삭제
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

  // 판매글 조회
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
      {
        state: "true",
        message: "판매글 검색",
        data: {
          id: "2",
          title: "제목2",
          content: "내용2",
          regDate: "2023-11-24 21:37:00",
        },
      },
    ]);
  }),

  // 판매글 찜하기
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

  // 판매글 검색
  // /?value=기타&page=1&size=10
  http.get("/posts/list", () => {
    return HttpResponse.json([
      {
        content: [
          {
            salePostId: 3,
            memberName: "김두식",
            sportsName: "야구",
            stadiumName: "고척 돔 야구장",
            homeTeamName: "키움",
            awayTeamName: "두산",
            quantity: 1,
            salePrice: 18000,
            originalPrice: 20000,
            expirationAt: "2023-12-10T10:00:00",
            isSuccessive: false,
            seatInfo: "A열 4석 3층 지정석",
            imgUrl: "Image url",
            note: "비고",
            saleStatus: "FOR_SALE",
            createdAt: "2023-12-11T14:12:03.492",
          },
        ],
        pageable: {
          pageNumber: 0,
          pageSize: 10,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          offset: 0,
          paged: true,
          unpaged: false,
        },
        totalElements: 1,
        totalPages: 1,
        last: true,
        size: 10,
        number: 0,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        numberOfElements: 1,
        first: true,
        empty: false,
      },
      {
        content: [
          {
            salePostId: 2,
            memberName: "김두식",
            sportsName: "야구",
            stadiumName: "고척 돔 야구장",
            homeTeamName: "키움",
            awayTeamName: "두산",
            quantity: 1,
            salePrice: 18000,
            originalPrice: 20000,
            expirationAt: "2023-12-10T10:00:00",
            isSuccessive: false,
            seatInfo: "C열 10석 3층 지정석",
            imgUrl: "Image url",
            note: "This is a note",
            saleStatus: "FOR_SALE",
            createdAt: "2023-12-11T14:12:03.492",
          },
        ],
        pageable: {
          pageNumber: 0,
          pageSize: 10,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          offset: 0,
          paged: true,
          unpaged: false,
        },
        totalElements: 1,
        totalPages: 1,
        last: true,
        size: 10,
        number: 0,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        numberOfElements: 1,
        first: true,
        empty: false,
      },
      {
        content: [
          {
            salePostId: 1,
            memberName: "이청명",
            sportsName: "야구",
            stadiumName: "대구 라이온즈 파크",
            homeTeamName: "삼성",
            awayTeamName: "키움",
            quantity: 1,
            salePrice: 24000,
            originalPrice: 30000,
            expirationAt: "2023-12-08T10:00:00",
            isSuccessive: false,
            seatInfo: "B열 3석 VIP석",
            imgUrl: "Image url",
            note: "This is a note",
            saleStatus: "FOR_SALE",
            createdAt: "2023-12-11T14:12:03.492",
          },
        ],
        pageable: {
          pageNumber: 0,
          pageSize: 10,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          offset: 0,
          paged: true,
          unpaged: false,
        },
        totalElements: 1,
        totalPages: 1,
        last: true,
        size: 10,
        number: 0,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        numberOfElements: 1,
        first: true,
        empty: false,
      },
    ]);
  }),
];
