import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "@recoil/loginState";
import { userInfoState } from "@recoil/userInfoState";
import { removeCookie } from "@utils/cookies";
import Swal from "sweetalert2";

export function useLogout() {

    const navigate = useNavigate();
    const setLoginState = useSetRecoilState(loginState);
    const userInfo = useRecoilValue(userInfoState);

    const logoutHandler = async () => {
        try {
            axios.post("/members/logout", {id: userInfo.id});

            removeCookie();

            setLoginState(false);

            navigate("/login");

        } catch (error){
            console.error("로그아웃 오류:",error);

            Swal.fire({
                icon: "error",
                text: "로그아웃 중에 오류가 발생했습니다.",
            });
        }
    };

    const onClickLogoutBtnHandler = () => {
        Swal.fire({
            icon: "warning",
            text: "로그아웃 하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "네!"
        }).then((result) => {
            if (result.isConfirmed){
                logoutHandler();
            }

        })
    }

    return (
        {onClickLogoutBtnHandler}
    );
}
