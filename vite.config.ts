import { defineConfig } from 'vite'
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), netlifyPlugin(), svgr()],
})
