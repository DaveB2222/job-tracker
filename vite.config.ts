import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/job-tracker/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      '5173-daveb2222-jobtracker-5ufeeycy9y3.ws-us120.gitpod.io'  // <-- Your Gitpod URL
    ]
  }
})



