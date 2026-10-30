import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    allowedHosts: [
      "tattvatech.co.in",
    ],
  },
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    nitro(),
  ],
});
