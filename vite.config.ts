import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      entry: 'src/recorder/index.ts',
      name: 'VARecorder',
      fileName: format => `bundle.${format}.js`
    }
  },

  optimizeDeps: {
    exclude: ['vue-demi']
  }
})
