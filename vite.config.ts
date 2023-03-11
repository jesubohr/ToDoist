import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "logo.png",
        "waves.png",
        "accept-terms.svg",
        "robots.txt",
        "apple-touch-icon.png"
      ],
      manifest: {
        name: "ToDoist",
        short_name: "ToDoist",
        description: "Simple and elegant ToDo web app to manage your tasks.",
        theme_color: "#8039c6",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ]
})
