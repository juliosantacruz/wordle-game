import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: "/wordle-game/",
  ...(process.env.NODE_ENV === "development"
    ? {
        define: {
          global: {},
        },
      }
    : {}),
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),

        ...(process.env.NODE_ENV !== "development"
          ? {
              "./runtimeConfig": "./runtimeConfig.browser", //fix production build
            }
          : {}),
      },
    ],
  },
});
