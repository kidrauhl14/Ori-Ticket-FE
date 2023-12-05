/** @type {import('tailwindcss').Config} */
import daisyUIPlugin from "daisyui";
import formsPlugin from "@tailwindcss/forms";
import ratioPlugin from "@tailwindcss/aspect-ratio";
export const mode = "jit";
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
];
export const darkMode = "class";
export const theme = {
  screens: {
    sm: "400px",
    md: "768px",
    lg: "1025px",
    xl: "1280px",
    xl2: "1360px",
  },
  extend: {
    colors: {
      "navy-basic": "#041882",
      "yellow-basic": "#fde047",
      "sky-basic": "#3EAAE0",
    },
  },
};

export const plugins = [
  daisyUIPlugin,
  formsPlugin,
  ratioPlugin,
];

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
