export default function Spinner() {
  return (
    <div>
      <span>잠시만 기다려주세요</span>
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>
  );
}
