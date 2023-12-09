import React, { useEffect, useState } from "react";

export default function Test() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //   //  모의 API로부터 데이터를 가져오는 fetch 요청
    //   fetch("/auth", { method: "POST" })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(
    //           `HTTP error! Status: ${response.status}`
    //         );
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       // 받아온 데이터를 상태에 저장
    //       setUserData(data);
    //     })
    //     .catch((error) => {
    //       console.error("Fetch error:", error);
    //     });
    // }, []);

    async function fetchData() {
      try {
        const response = await fetch("/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "none@naver.com",
            password: "sdfkljsldf",
          }),
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        setUserData(data); // 응답 데이터를 userData 상태에 저장
      } catch (error) {
        console.error("Fetching error:", error);
      }
    }

    fetchData();
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <div>
      <div className="flex-col bg-white h-12">
        <div className="bg-black">테스트중</div>
        {/* userData가 로드되면 해당 정보를 사용 */}
        {/* {userData &&
          Array.isArray(userData) &&
          userData.map((user) => (
            <p key={user.room_id}>{user.room_id}</p>
          ))} */}
        {userData &&
          userData.map((info, index) => (
            <div className="bg-white" key={index}>
              User Data: {JSON.stringify(info.room_id)};
            </div>
          ))}
      </div>
    </div>
  );
}
