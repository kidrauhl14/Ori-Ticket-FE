import { atom } from "recoil";

export const sellReportDataState = atom({
  key: "sellReportDataState",
  default: [], // data형태: [{...}, {...}, {...}, {...}]
});

export const tradeReportDataState = atom({
  key: "tradeReportDataState",
  default: [], // data형태: [{...}, {...}, {...}, {...}]
});
