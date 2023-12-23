import { atom } from "recoil";
import { getCookie } from "@utils/cookies";

export const loginState = atom({
    key: "loginState",
    default: getCookie("accessToken") !== undefined ? true : false,
})