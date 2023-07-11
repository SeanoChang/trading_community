import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    test: {
      globals: true,
      setupFiles: ['./__tests__/setup.ts'],
      environment: 'jsdom',
    },
})