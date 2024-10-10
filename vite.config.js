import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Server IP address

const serverIP = 'localhost';

// const serverIP = '192.168.101.49';


export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: serverIP,  // Set to your server's IP address
    port: 3000,      // Change this to the desired port number
    strictPort: true, // Fail if the port is already in use
  }
})
