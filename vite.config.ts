import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [

  ],
  resolve: {
    alias: {
      '@Core': fileURLToPath(new URL('./src/Core', import.meta.url)),
      '@Application': fileURLToPath(new URL('./src/Application', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
})
