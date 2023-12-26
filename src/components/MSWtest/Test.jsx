import React, { useEffect, useState } from "react";

export default function Test() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   email: "none@naver.com",
          //   password: "sdfkljsldf",
          // }),
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
        {userData &&
          userData.map((info, index) => (
            <div className="bg-white" key={index}>
              User Data: {JSON.stringify(info)};
            </div>
          ))}
      </div>
    </div>
  );
}
