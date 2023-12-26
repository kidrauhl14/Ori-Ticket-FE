import {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Navbar from "@components/common/Navbar.jsx";
import fetchChatList from "@utils/fetchChatList.jsx";
// import chatDummy from "@components/chatDummy.json";

// function getLastMessageText(messages) {
//   const lastMessage = messages[messages.length-1];
//   return lastMessage ? (lastMessage.type === 'image' ? '[사진]' : lastMessage.text) : '';
// }

export default function ChatlistPage() {
  const [chatList, setChatList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChatList = async () => {
      try {
        const data = await fetchChatList();
        setChatList(data);
      } catch (error){
        setError(error);
      }
    }
    loadChatList();
  }, []);  

  return (
    <div className="h-screen">
      <Navbar />
      <div>
        <h1 className="text-navy-basic flex justify-start text-2xl ml-2 font-extrabold">
          채팅
        </h1>
        <div className="shadow-lg border rounded-lg max-w-5xl mt-4">
          {chatList.length > 0 ? (
            chatList.map((chatRoom) => (
              <Link
                key={chatRoom.chatRoomId}
                to={`/chatlist/${chatRoom.chatRoomId}`}
                className="text-navy-basic"
              >
                <div
                  key={chatRoom.chatRoomId}
                  className="bg-white m-4 h-20 flex items-center border rounded-lg"
                >
                  <div className=" w-16 h-16 bg-slate-300 ml-2 rounded-full"></div>
                  <div className="bg-pink-200 truncate flex-shrink-0 max-w-lg flex flex-col items-start ml-4 ">
                    <div className="text-xl font-extrabold mb-2">
                      {chatRoom.members[0]}
                    </div>
                    {/* <div className="bg-yellow-100 whitespace-nowrap truncate text-md font-extrabold">
                      {getLastMessageText(chatRoom.messages)}
                    </div> */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-lg p-4">채팅방이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
