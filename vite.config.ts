import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { basePath } from './cdk/constants/paths'

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  plugins: [reactRefresh()],
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
