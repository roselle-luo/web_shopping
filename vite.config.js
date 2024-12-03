import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',  // 监听所有网络接口
    proxy: {
      // 当请求路径以 /api 开头时，代理到目标地址
      '/api': {
        target: 'http://10.60.81.45:8080',  // 后端 API 地址
        changeOrigin: true,  // 修改请求头中的 Origin 字段
        rewrite: (path) => path.replace(/^\/api/, ''),  // 去掉路径中的 /api 前缀
      },
    },
  },
});
