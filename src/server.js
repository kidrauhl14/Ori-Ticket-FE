import {io} from "socket.io-client";
const socket = io("http://13.124.46.138:8080/ws-stomp/chat");
export default socket;