import fetchDataUseAxios from '@hooks/useAxios';

const fetchChatList = async (userId) => {
    const response = await fetchDataUseAxios("useTokenAxios", {
      method: "get",
      url: `http://13.124.46.138:8080/chatroom/member?&id=${userId}`,
    });  

     if (response && response.status === 200) {
       return response.data; 
       
     } else {
       console.error("채팅목록 조회 실패");
     }
     console.log("채팅목록 조회 ", response.status);
};

export default fetchChatList;
