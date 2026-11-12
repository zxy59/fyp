import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // npm run dev 使用 React 版入口；日常演示直接双击 index.html
  root: '.',
  build: { rollupOptions: { input: 'index.vite.html' } },
  server: {
    port: 5173,
    // [BACKEND] 开发时代理到 Python 推理服务，接入后端时取消注释：
    // proxy: {
    //   '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
    // },
  },
})
