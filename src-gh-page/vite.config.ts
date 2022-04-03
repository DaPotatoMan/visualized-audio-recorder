import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoIcons from 'unplugin-icons/vite'
import AutoIconsResolver from 'unplugin-icons/resolver'

import WindiCSS from 'vite-plugin-windicss'

export default defineConfig(config => ({
  base: config.command === 'serve' ? '/' : '/visualized-audio-recorder/',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'types/auto-imports.d.ts'
    }),
    Components({
      dts: 'types/auto-components.d.ts',
      resolvers: [AutoIconsResolver()]
    }),
    AutoIcons(),
    WindiCSS({ transformCSS: 'pre' })
  ]
}))
