import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// 11 个独立项目，各自保留一份 HTML 入口，互不干扰样式作用域
export const projects = [
  '24iFM',
  'CLMSApp',
  'GigsMesh',
  'HongYeGroupWeb',
  'SMARTICLEANHT',
  'SmartiCleanApp',
  'YYBusinessApp',
  'YYCircleApp',
  'YYCircleWeb',
  'YYForceWeb',
  'YYPetApp',
]

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5199,
    open: '/',
    watch: {
      ignored: ['**/.figma/**', '**/.git/**'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        shell: resolve(process.cwd(), 'index.html'),
        ...Object.fromEntries(
          projects.map((p) => [p, resolve(process.cwd(), p, 'index.html')]),
        ),
      },
    },
  },
})
