import React from 'react'
import TicketImg from "@assets/img_ticket.png"
import KakaoImg from "@assets/img_kakao.png"
import NaverImg from "@assets/img_naver.png";

export default function LoginPage() {
  return (
    <div className="grid-rows-4 w-72">
      <div className="flex  justify-center h-full w-full">
        <img
          src={TicketImg}
          alt="Ori-Ticket 로고"
          className="flex justify-center h-full w-full"
        />
      </div>
      <div className="h-16">
        <p className="my-8 font-extrabold text-2xl">
          여러분이 놓친
          <br />
          야구, 축구, 농구
          <br />
          티켓이 기다리고 있습니다.
        </p>
      </div>
      <div className="h-16 mt-14">
        <p>
          쉽게 가입하고, <br />
          간편하게 로그인 하세요.
        </p>
      </div>
      <div className="inline-flex h-40 flex flex-col justify-center items-center">
        <button className="p-0 mb-4">
          <img
            src={KakaoImg}
            alt="카카오 로그인 이미지"
            className="w-full h-full"
          />
        </button>
        <button className="p-0">
          <img
            src={NaverImg}
            alt="네이버 로그인 이미지"
            className="w-full h-full rounded"
          />
        </button>
      </div>
    </div>
  );

}

  
