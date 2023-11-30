import React from "react";

// 이미지
import TicketImg from "@assets/img_ticket.png";

export default function SearchBar() {
  return (
    <div className="flex items-center border-2 border-blue-950 rounded-xl w-full">
      <img
        src={TicketImg}
        alt="Ori-Ticket logo"
        className="w-20 h-20 m-1 rounded-xl"
      />
      <input
        type="search"
        name="search"
        aria-label="검색어를 입력"
        placeholder="검색어를 입력해 주세요."
        className="w-full h-20 mr-1 p-3 rounded-xl"
      ></input>
    </div>
  );
}
