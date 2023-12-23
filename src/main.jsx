import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Recoil
import { RecoilRoot } from "recoil";

// // MSW 적용
// async function enableMocking() {
//   if (process.env.NODE_ENV !== "development") {
//     return;
//   }

//   const { worker } = await import("./mocks/browser");

//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start();
// }

// enableMocking().then(() => {
//   ReactDOM.createRoot(
//     document.getElementById("root")
//   ).render(
//     <RecoilRoot>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </RecoilRoot>
//   );
// });

// msw 적용 해제시 밑에 활성화
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>
);
