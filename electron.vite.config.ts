import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'electron-vite'

const sharedAlias = {
  '@main': fileURLToPath(new URL('src/main', import.meta.url)),
  '@preload': fileURLToPath(new URL('src/preload', import.meta.url)),
  '@renderer': fileURLToPath(new URL('src/renderer/src', import.meta.url))
}

export default defineConfig({
  main: {
    resolve: {
      alias: sharedAlias
    }
  },
  preload: {
    resolve: {
      alias: sharedAlias
    }
  },
  renderer: {
    resolve: {
      alias: sharedAlias
    },
    plugins: [react(), tailwindcss()]
  }
})
