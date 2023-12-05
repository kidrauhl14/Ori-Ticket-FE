import { useParams } from "react-router-dom";
import Navbar from "@components/common/Navbar.jsx";
import ReportBtn from "@assets/img_btn_report.png";
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
    <div className="bg-yellow-100">
      <Navbar />
      <button className="w-1/6 p-0">
        <img src={ReportBtn} />
      </button>
      <div className="flex justify-center">
        <div className="flex-col justify-center w-4/5 border rounded-lg bg-violet-100">
          {/* <div>
          <div className="text-navy-basic font-extrabold text-4xl">
            거래중인 티켓정보
          </div>
          <div className="text-black font-extrabold text-3xl">
            PIN번호: C98998898
          </div>
        </div> */}
          <div className="w-1/6 bg-navy-basic border rounded-lg">
            {/* 채팅 상대방 정보 */}
            <p className="text-white font-extrabold text-xl">
              {chatRoom.participants[0].name}
            </p>
          </div>
          <div>
            {/* 채팅 내용 */}
            <ul>
              {chatRoom.messages.map((msg, index) => (
                <li key={index}>
                  {msg.type === "text" ? (
                    <p>{msg.text}</p>
                  ) : (
                    <img
                      src={msg.attachment.payload.url}
                      alt={msg.attachment.caption}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
