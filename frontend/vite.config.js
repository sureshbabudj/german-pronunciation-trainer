import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig(({ mode }) => {
  console.log(`Using mode: ${mode}`);
  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    define: {
      "process.env": process.env,
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000", // proxy to backend for local development
        },
      },
    },
  };
});
