import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/datagov': {
        target: 'https://data.gov.sg',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/datagov/, ''),
      },
    },
  },
})
