import {atom, selector} from 'recoil';

export const accessTokenState = atom({
  key: "accessTokenState",
  default: null, // 초기값: 로그인되지 않은 상태(null)
});

// 유저의 로그인여부 판단
export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({get}) => !!get(accessTokenState)
})

export const refreshTokenState = atom({
  key: "refreshTokenState",
  default: null, // 초기값: 로그인되지 않은 상태(null)
});

export const userInfoState = atom({
    key: 'userInfoState',
    default : {
        id: null, // 로그인되지 않은 상태
        nickname: null,
        
    }
})
