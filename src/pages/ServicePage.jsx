import Navbar from "@components/common/Navbar.jsx";
import TicketImg from "@assets/img_ticket.png";

export default function ServicePage() {
  return (
    <div className="max-h-screen overflow-visible">
      <Navbar />
      <div>
        <h1 className="text-navy-basic flex justify-start text-2xl ml-2 font-extrabold">
          고객센터
        </h1>
      </div>

      <div className="overflow-y-auto max-h-96 bg-pink-100 border-navy-basic border-4 rounded-lg max-w-5xl mt-4">
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="text-left max-w-sm chat-bubble chat-bubble-warning">
            안녕하세요, 입금이 아직 안돼서 연락드립니다.
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="프로필 이미지" src={TicketImg} />
            </div>
          </div>
          <div className="chat-header">
            고객센터
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="text-left max-w-sm chat-bubble chat-bubble-warning">
            안녕하세요. 고객님! 문의 주신 건을 확인해보니 PIN 번호 유효성 확인은
            마쳤지만 구매자 분께서 아직 미입금 상태로로 거래 보류 중으로
            확인됩니다. 또한 구매자 입금 확인 시 거래 보류 상태가 해제되며 관람
            종료 시 고객님에게 최종 입금이 될 예정입니다. 구매자에게 연락 후
            입금 확인 되는대로 재안내 드리겠습니다. 불편을 드려서 죄송합니다.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="text-left max-w-sm chat-bubble chat-bubble-warning">
            빠른 답변 감사합니다. 그럼 입금 확인되면 관람 종료 후 저한테 돈이
            들어오는건가요?
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="프로필 이미지" src={TicketImg} />
            </div>
          </div>
          <div className="chat-header">
            고객센터
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="text-left max-w-sm chat-bubble chat-bubble-warning">
            네, 그렇습니다. 고객님! 관람 종료 후 수수료(1,000원) 차감후 차액이
            바로 입금 됩니다. 앞전에 문의 주신 내용이 변경점이 생기면 빠른 안내
            드리겠습니다. 다른 문의사항이나 궁금한점 있으시면 안내
            도와드리겠습니다. 감사합니다.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="text-left max-w-sm chat-bubble chat-bubble-warning">
            빠른 답변 감사합니다.
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="프로필 이미지" src={TicketImg} />
            </div>
          </div>
          <div className="chat-header">
            고객센터
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="text-left max-w-sm chat-bubble chat-bubble-warning">
            감사합니다. 궁금한 점이 있으시면 언제든지 이곳으로 연락주세요!
          </div>
        </div>
      </div>
    </div>
  );
}

