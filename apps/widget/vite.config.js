import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'FeedbackWidget',
      fileName: () => `widget.js`,
      formats: ['iife'], // for <script> usage
    }
  }
})
