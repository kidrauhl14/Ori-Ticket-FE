import {useSetRecoilState} from 'recoil';
import {setCookie} from '@utils/cookies';
import { userInfoState } from '@recoil/userInfoState';

export default function SuccessLogin({response}) {

    setCookie("accessToken", response.headers.authorization);
    setCookie("refreshToken", response.headers["authorization-refresh"]);

    const setUserInfo = useSetRecoilState(userInfoState);
    setUserInfo({
        id: response.data.id,
        nickname: response.data.nickname
    });

    return "";
}
