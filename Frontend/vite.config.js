import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    loader: "jsx", // allow JSX in .js files
    include: /src\/.*\.js$/, // process all .js files in src
  },
});
