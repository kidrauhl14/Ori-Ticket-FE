import axios from 'axios';
import {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import Navbar from "@components/common/Navbar.jsx";
import { userInfoState } from "@recoil/userInfoState";
import Spinner from "@components/common/Spinner.jsx";

export default function ChatlistPage() {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo.id;
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchChatList() {
    try {
      const response = await axios.get(
        `https://oriticket.link/chatroom/member?&id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP 에러! 상태: ${response.status}`);
      }

      setChatList(response.data);
      setLoading(false);
      console.log("해당 유저의 채팅목록", response.data);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  }

  useEffect(() => {
    fetchChatList();
  }, []);

  // function getLastMessageText(messages) {
  //   const lastMessage = messages[messages.length-1];
  //   return lastMessage ? (lastMessage.type === 'image' ? '[사진]' : lastMessage.text) : '';
  // }

  return (
    <div className="h-screen">
      <Navbar />
      <div>
        <h1 className="text-navy-basic flex justify-start text-2xl ml-2 font-extrabold">
          채팅
        </h1>
        <div className="shadow-lg border rounded-lg max-w-5xl mt-4">
          {loading ? <Spinner /> : chatList.length > 0 ? (
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
                  <div className="bg-yellow-100 truncate flex-shrink-0 max-w-lg flex flex-row items-start ml-4 ">
                    <div className="text-xl font-extrabold mb-2">
                      {chatRoom.members[0].membersId === userId
                        ? chatRoom.members[1].nickName
                        : chatRoom.members[0].nickName}
                    </div>
                    <div className="text-xl font-extrabold mb-2">
                      (거래번호: {chatRoom.transactionId})
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
