import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log("vite.config.js", mode)
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr()
    ],
    ...(mode !== "production" && {
      server: {
        host: "0.0.0.0", // This is like super important or whatever https://dev.to/mandrasch/vite-is-suddenly-not-working-anymore-due-to-cors-error-ddev-3673
        cors: true,
        port: env.PORT || 3000
      }
    })
  }
})
