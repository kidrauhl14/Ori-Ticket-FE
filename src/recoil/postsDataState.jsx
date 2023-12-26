import React from 'react';
import { atom, useRecoilState } from 'recoil';

export const postsDataState = atom({
  key: 'postsDataState',
  default: [], // data형태: [{...}, {...}, {...}, {...}]
});
