import Navbar from '@components/common/Navbar.jsx'
import TicketImg from "@assets/img_ticket.png";

export default function PaymentPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mb-4">
        <h1 className="text-navy-basic font-extrabold text-6xl">주문완료!</h1>
        <div className="border border-4 rounded-lg border-navy-basic mt-16">
          <div className="bg-pink-300 w-96 flex flex-shrink-0 m-8">
            <div className="flex items-center ">
              <img src={TicketImg} className="w-28 border rounded-lg" />
              <p className="font-extrabold text-xl">
                성공적으로 주문처리되었습니다. <br />
                오리티켓을 이용해주셔서 감사합니다.
              </p>
            </div>
          </div>
          <p>주문 상세내역은 프로필 &gt; 거래완료에서 확인이 가능합니다.</p>
        </div>
      </div>
    </div>
  );
}
