import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@components/common/Navbar.jsx";
import chatDummy from "@components/chatDummy.json";


function getLastMessageText(messages) {
  const lastMessage = messages[messages.length-1];
  return lastMessage ? (lastMessage.type === 'image' ? '[사진]' : lastMessage.text) : '';
}

export default function ChatlistPage() {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-navy-basic flex justify-start text-2xl ml-2 font-extrabold">
          채팅
        </h1>
        <div className="bg-navy-basic border rounded-lg max-w-5xl mt-4">
          {chatDummy.map((chatRoom) => (
            <Link
              key={chatRoom.room_id}
              to={`/chatlist/${chatRoom.room_id}`}
              className="text-navy-basic"
            >
              <div
                key={chatRoom.room_id}
                className="bg-white m-4 h-20 flex items-center border rounded-lg"
              >
                <div className=" w-16 h-16 bg-slate-300 ml-2 rounded-full"></div>
                <div className="bg-pink-200 truncate flex-shrink-0 max-w-lg flex flex-col items-start ml-4 ">
                  <div className="text-xl font-extrabold mb-2">
                    {chatRoom.participants[0].name}
                  </div>
                  <div className="bg-yellow-100 whitespace-nowrap truncate text-md font-extrabold">
                    {getLastMessageText(chatRoom.messages)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
