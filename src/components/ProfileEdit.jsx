// import axios from "axios";
import { useEffect, useState } from "react";
import { getUserInfo, patchUserInfo, deleteUserInfo } from "./api/AuthApi";

export default function ProfileEdit() {
  const [newPhone, setNewPhone] = useState("");
  const [showModal, setShowModal] = useState(false); // 회원 탈퇴 시 띄워줄 모달창

  const [patchInfo, setPatchInfo] = useState(null); // 회원정보 수정
  const [getInfo, setGetInfo] = useState(null); // 회원정보 확인
  const [deleteInfo, setDeleteInfo] = useState(null); // 회원 탈퇴 (모달창을 띄우기 위해 상태 저장)

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // 회원정보 확인 (GET)
        const userData = await getUserInfo();
        setGetInfo(userData);

        // 회원정보 수정 (PATCH)
        const patchData = await patchUserInfo(newPhone);
        setPatchInfo(patchData);

        // 회원 탈퇴 (DELETE)
        const deleteData = await deleteUserInfo();
        setDeleteInfo(deleteData);
        setShowModal(true); // 회원 탈퇴 성공 시

      } catch (error) {
        console.log("Fetching error:", error);
      }
    }

    fetchData();
  }, [newPhone]);

  return (
    <div>
      <div className="flex-col bg-yellow-100 h-12">
        <div className="text-black">회원정보 수정 (patch)</div>
        {patchInfo && (
          <div className="bg-blue-100">
            수정된 회원정보: {JSON.stringify(patchInfo)}
          </div>
        )}
        {/* 전화번호 입력 */}
        <input
          type="text"
          value={newPhone}
          onChange={handlePhoneChange}
          placeholder="새로운 전화번호를 입력해보도록!"
        />
      </div>
      <div className="flex-col bg-yellow-100 h-12">
        <div className="text-black">회원정보 확인 (get)</div>
        <div>회원정보:{JSON.stringify(getInfo)} </div>
      </div>
      <div className="flex-col bg-yellow-100 h-12">
        <div className="text-black">회원 탈퇴 (delete)</div>
        {showModal && (
          <div className="modal">
            탈퇴 성공!
            <button onClick={() => setShowModal(false)}>확인~</button>
          </div>
        )}
      </div>
    </div>
  );
}
