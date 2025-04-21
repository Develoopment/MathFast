import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

// you have to add in '/MathFast' to the other end of || in base to make the deployment work
//however, remove it when in development mode
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: process.env.VITE_BASE_PATH || "/MathFast",
})
