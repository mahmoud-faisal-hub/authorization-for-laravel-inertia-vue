import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'authorization-for-laravel-inertia-vue',
      fileName: (format) => `authorization-for-laravel-inertia-vue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@inertiajs/vue3'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
})
