import {atom} from 'recoil';

export const userInfoState = atom({
    key: 'userInfoState',
    default : {
        id: 1, // 예시
        nickname: "박강락", // 예시
        
    }
})
