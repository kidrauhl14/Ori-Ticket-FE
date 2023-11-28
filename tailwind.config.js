/** @type {import('tailwindcss').Config} */
import daisyUIPlugin from "daisyui";

export const mode = "jit";
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const darkMode = "class";
export const theme = {
  screens: {
    sm: "480px",
    md: "768px",
    lg: "1025px",
    xl: "1280px",
    xl2: "1360px",
  },
  extend: {},
};

export const plugins = [daisyUIPlugin];

export const daisyUISettings = {
  styled: true,
  themes: ["emerald", "dark", "forest", "synthwave"],
  base: true,
  utils: true,
  logs: true,
  rtl: false,
};


// export const mode = "jit";
// export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
// export const darkMode = "class";
// export const theme = {
//   screens: {
//     sm: "480px",
//     md: "768px",
//     lg: "1025px",
//     xl: "1280px",
//     xl2: "1360px",
//   },
//   extend: {},
// };

// export const plugins = [daisyui];










// export const daisyui = {
//   styled: true,
//   themes: ["emerald", "dark", "forest", "synthwave"],
//   base: true,
//   utils: true,
//   logs: true,
//   rtl: false,
// };