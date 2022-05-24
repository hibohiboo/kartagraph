import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { terser } from 'rollup-plugin-terser'
import { basePath } from './cdk/constants/paths'

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactFamily: [
            'react-router-dom',
            'styled-components',
            'react-icons',
            'react-dropzone',
          ],
          rtk: ['react-redux', '@reduxjs/toolkit'],
          others: ['lodash', 'web-vitals', 'date-fns'],
          firebase: [
            'firebase/app',
            'firebase/auth',
            'firebase/analytics',
            'firebase/firestore/lite',
          ],
        },
      },
    },
  },
  plugins: [reactRefresh(), terser({ compress: { drop_console: true } })],
  root: 'client',
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'react-native', replacement: 'react-native-web' },
    ],
  },
  base: `/${basePath}/`,
})
