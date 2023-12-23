import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@assets", replacement: "/src/assets" },
      {
        find: "@components",
        replacement: "/src/components",
      },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@recoil", replacement: "/src/recoil" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@hooks", replacement: "/src/hooks" },
    ],
  },
});
