import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import {useEffect, useState, useRef} from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

// import fetchChatRoom  from '@utils/fetchChatRoom.jsx';

import Navbar from "@components/common/Navbar.jsx";
import ReportBtn from "@assets/img_btn_report.png";
import TicketImg from "@assets/img_ticket.png";

import InputField from "@components/InputField.jsx";

import { userInfoState } from "@recoil/userInfoState";

export default function ChatPage() {
  const { chatRoomId } = useParams();
  // const chatRoomIdNumber = Number(chatRoomId);

  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo.id;

  const [message, setMessage] = useState(""); // 단일 메시지
  const [messageList, setMessageList] = useState([]); //해당 채팅방에 있는 모든 메시지

  // useRef를 사용하여 socket을 참조하면, 이 socket은 컴포넌트의 전체 수명 주기 동안 유지
  const socket = useRef();

  useEffect(() => {
    // SockJS클라이언트를 생성하여 서버의 웹소켓 엔드포인트에 연결 (세팅)
    socket.current = Stomp.over(
      new SockJS("http://13.124.46.138:8080/ws-stomp")
    );

    // 웹소켓 서버 연결
    socket.current.connect({}, function () {
      // 특정 채팅방의 메시지 구독
      socket.current.subscribe(
        `http://13.124.46.138:8080/ws-stomp/send/${chatRoomId}`,
        function (message) {
          // 새로운 메시지가 도착할 때마다, 메시지 리스트에 메시지 추가
          setMessageList((prevState) => [
            ...prevState,
            JSON.parse(message.body),
          ]);
        }
      );
    });

    // 컴포넌트 unmount 시에 웹소켓 연결 종료 (채팅 페이지를 벗어날 때)
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [chatRoomId]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message && socket.current) {
      const msg = { memberId: userId, message: message };
      socket.current.send(
        `http://13.124.46.138:8080/ws-stomp/chat/${chatRoomId}`,
        {},
        JSON.stringify(msg)
      );
      setMessage("");
    }
  };

  return (
    <div className="h-screen">
      <Navbar />

      <div className="flex justify-center">
        <div className="flex-col justify-center w-4/5">
          <div className="flex justify-end">
            <button className="w-1/6 p-0">
              <img src={ReportBtn} />
            </button>
          </div>

          <div className="border rounded-md border-navy-basic">
            <div className=" text-navy-basic font-extrabold text-4xl">
              거래중인 티켓정보
            </div>
            <div className="text-black font-extrabold text-3xl">
              PIN번호: C98998898
            </div>
          </div>
          <div className="w-1/6 mt-4 bg-navy-basic border rounded-lg">
            {/* 채팅 상대방 정보 */}
            <p className="text-white font-extrabold text-xl">헬로키티</p>
          </div>

          <div className="relative overflow-y-auto h-96 border-navy-basic border-4 rounded-lg max-w-5xl">
            <div>
              {/* 채팅 내용 */}
              {messageList.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    userId === msg.memberId ? "chat-end" : "chat-start"
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

                  {/* {msg.type === "text" ? (
                    <p>{msg.text}</p>
                  ) : (
                    <img
                      src={msg.attachment.payload.url}
                      alt={msg.attachment.caption}
                    />
                  )} */}
                </div>
              ))}
              <InputField
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
