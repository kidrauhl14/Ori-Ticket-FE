import {http, HttpResponse} from "msw";

export const authHandler = [

  // 회원정보 등록
  http.post("/members/signup", () => {
    return HttpResponse.json({
      nickname: "김오리",
      accessToken: "1",
      refreshToken: "2",
    });
  }),

  // 회원정보 수정
  http.patch("/members/:id", ({ req }) => {
    const { phone } = req.body.phone;

    return HttpResponse.json([
      {
        state: "true",
        message: "회원 정보 수정",
        data: {
          phone,
        },
      },
    ]);
  }),

  // 회원정보 확인
  http.get("/members", () => {
    return HttpResponse.json([
      {
        state: "true",
        message: "회원 정보 확인",
        data: {
          id: "1",
          email: "ddang@naver.com",
          name: "김땡땡",
          phone: "010-0000-0000",
          birth: "1990-11-25",
        },
      },
    ]);
  }),

  // 회원 탈퇴
  http.delete("/members", () => {
    return HttpResponse.json([
      {
        state: "true",
        message: "회원 정보 탈퇴",
        data: {
          id: "1",
        },
      },
    ]);
  }),


  // 로그아웃
  http.post("/api/logout", () => {
    return HttpResponse.json([
      
    ]);
  })
];