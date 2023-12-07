// import {useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import Navbar from "@components/common/Navbar.jsx";
import serviceDummy from "@components/serviceDummy.json";
import TicketImg from "@assets/img_ticket.png";

export default function ServicePage() {
  // const serviceRoom = serviceDummy.find(
  //   (room) => currentUserId === room.participants[1].id
  // );
  
  // useEffect(() => {
  //   console.log("현재 사용자의 ID:", currentUserId);
  
  // }, [currentUserId]);

  const serviceRoom = serviceDummy.find((room) => room.room_id === "eunchae");

   if (!serviceRoom) {
     return <div>채팅방을 찾을 수 없습니다.</div>;
   }
  
  
  return (
    <div className="bg-yellow-100 h-screen">
      <Navbar />
      <div>
        <h1 className="text-navy-basic flex justify-start text-2xl ml-2 font-extrabold">
          고객센터
        </h1>
      </div>

      <div className="overflow-y-auto h-2/3 bg-pink-100 border-navy-basic border-4 rounded-lg max-w-5xl mt-4">
        {serviceRoom.messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.from === serviceRoom.participants[0]
                ? "chat-start"
                : "chat-end"
            }`}
          >

            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              {msg.sender_name}
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="text-left max-w-sm chat-bubble chat-bubble-warning">
              {msg.text}
            </div>



          </div>
        ))}
      </div>
    </div>
  );
}

