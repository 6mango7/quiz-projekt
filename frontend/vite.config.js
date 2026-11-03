import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,              // nasłuchuj na zewnątrz kontenera
    port: 5173,
    watch: { usePolling: true }, // na Windowsie bez tego nie działa auto-odświeżanie
  },
})