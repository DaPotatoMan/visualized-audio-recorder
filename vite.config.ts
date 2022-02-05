import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-dts'

export default defineConfig({
  plugins: [vue(), dts()],

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
