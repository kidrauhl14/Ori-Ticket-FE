// 날짜를 년-월-일 형식으로 변환하는 함수
export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
};


