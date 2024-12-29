import { defineConfig } from 'vite'
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import * as fs from 'fs-extra'
import type { Plugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
      {
          name: 'copy-redirects',
          enforce: 'post',
          async closeBundle() {
              await fs.copy('public/_redirects', 'dist/_redirects')
          }
      } as Plugin
  ), netlifyPlugin(), svgr()],
    build: {
        outDir: 'dist',
        copyPublicDir: true,
    }
})
