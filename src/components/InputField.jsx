const InputField = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="bottom-0 w-full h-16 bg-blue-100 input-area flex items-center p-4">
      {/* <button className="h-6 plus-button text-2xl text-gray-500 mr-2">+</button> */}
      <form onSubmit={sendMessage} className=" input-container flex flex-grow">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none"
        />

        <button
          disabled={message === ""}
          type="submit"
          className="ml-2 send-button bg-navy-basic text-white px-4 py-2 rounded-r-lg disabled:bg-gray-300"
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default InputField;
