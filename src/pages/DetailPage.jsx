import {Link} from "react-router-dom";
import Navbar from "@components/common/Navbar.jsx";
import ReportBtn from "@assets/img_btn_report.png"

export default function DetailPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mb-4">
        <h1 className="text-navy-basic font-extrabold text-5xl">ORI-TICKET</h1>
        <h1 className="text-navy-basic font-extrabold text-5xl">상품정보</h1>

        <div className="mt-8 rounded-xl border-4 border-blue-950">
          <ul className="flex justify-between my-4">
            <li className="w-72 text-sm">상품정보</li>
            <li className="w-28 text-sm">수량</li>
            <li className="w-28 text-sm">가격</li>
            <li className="w-28 text-sm">등록일</li>
          </ul>
          <div>
            <div className="flex w-full h-full rounded-xl border-2 border-blue-950 mt-1">
              <div className="w-72">
                <div className="flex m-2 text-sm breadcrumbs">
                  <ul>
                    <li>
                      <a className="text-navy-basic hover:text-navy-basic">
                        sport_name
                      </a>
                    </li>
                    <li>
                      <a className="text-navy-basic hover:text-navy-basic">
                        team_name
                      </a>
                    </li>
                    <li>
                      <a className="text-navy-basic hover:text-navy-basic">
                        stadium_name
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex-col m-2">
                  <div className="text-xl text-left font-extrabold">
                    seat_info
                  </div>
                  <div className="text-left font-semibold">use_date</div>
                </div>
              </div>
              <div className="w-28 grid justify-center items-center text-sm">
                quantity
              </div>
              <div className="w-28 flex-col">
                <div className="text-sm text-end mt-6 pr-6 justify-end">
                  original_price
                </div>
                <div className="font-extrabold text-xl text">sale_price</div>
              </div>
              <div className="w-28 grid justify-center items-center text-sm">
                post_date
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex-col  mb-4 w-4/5">
                <div className="my-4 font-extrabold text-navy-basic font-extrabold text-xl w-1/3 ml-auto">
                  총 가격: 36,000원
                </div>
                <button className="w-full border rounded-lg bg-navy-basic text-white font-extrabold text-xl">
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-end w-5/6 mr-4">
        <div className="mr-4">
          <input
            type="checkbox"
            id="over_price"
            className="form-checkbox rounded-full bg-yellow-300"
          />
          <label
            htmlFor="over_price"
            className="font-extrabold text-navy-basic"
          >
            정가 이상 등록
          </label>
        </div>
        <div className="mr-4">
          <input
            type="checkbox"
            id="fake_item"
            className="form-checkbox rounded-full bg-yellow-300"
          />
          <label htmlFor="fake_item" className="font-extrabold text-navy-basic">
            허위 매물 의심
          </label>
        </div>
        <div className="mr-4">
          <input
            type="checkbox"
            id="inappropriate_pic"
            className="form-checkbox rounded-full bg-yellow-300"
          />
          <label
            htmlFor="inappropriate_pic"
            className="font-extrabold text-navy-basic"
          >
            부적절한 사진
          </label>
        </div>
        <button className="p-0">
          <img src={ReportBtn} className="w-24" />
        </button>
      </div>
    </div>
  );
}
