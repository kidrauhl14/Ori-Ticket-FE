import fetchDataUseAxios from "@hooks/useAxios";

const fetchChatList = async (chatRoomId) => {
  const response = await fetchDataUseAxios("useTokenAxios", {
    method: "get",
    url: `http://13.124.46.138:8080/ws-stomp/chat/${chatRoomId}`,
  });

  if (response && response.status === 200) {
    return response.data;
  } else {
    console.error("채팅방 조회 실패");
  }
};

export default fetchChatList;
