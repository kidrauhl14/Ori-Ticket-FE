import { useParams } from "react-router-dom";
import Navbar from "@components/common/Navbar.jsx";
import ReportBtn from "@assets/img_btn_report.png";
import TicketImg from "@assets/img_ticket.png";
import chatDummy from "@components/chatDummy.json";

export default function ChatPage() {
  const {room_id} = useParams();

  // room_id를 사용해 채팅방 데이터 찾기
  const chatRoom = chatDummy.find(room => room_id === room.room_id);
  if (!chatRoom){
    return <div>채팅방을 찾을 수 없습니다.</div>
  }

  // 채팅 상대방 정보, 채팅 내용 렌더링
  return (
    <div className="bg-blue-100 h-screen">
      <Navbar />

      <div className="flex justify-center">
        <div className="flex-col justify-center w-4/5 border rounded-lg bg-violet-100">
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
          <div className="w-1/6 bg-navy-basic border rounded-lg">
            {/* 채팅 상대방 정보 */}
            <p className="text-white font-extrabold text-xl">
              {chatRoom.participants[0].name}
            </p>
          </div>

          <div className="overflow-y-auto h-2/3 bg-pink-100 border-navy-basic border-4 rounded-lg max-w-5xl mt-4">
            <div>
              {/* 채팅 내용 */}
              {chatRoom.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    msg.from === chatRoom.participants[0].id
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
