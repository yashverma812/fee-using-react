import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single-page app — React Router handles every route on the client.
export default defineConfig({
  plugins: [react()],
})
