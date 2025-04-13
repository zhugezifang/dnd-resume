import { sentryVitePlugin } from '@sentry/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import { splitChunks } from './build/split-chunks.ts'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    sentryVitePlugin({
      org: 'arman-4n',
      project: 'dnd-resume',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: splitChunks(),
      },
    },
    sourcemap: true,
  },
})
