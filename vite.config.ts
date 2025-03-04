import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
 plugins: [react()],
 resolve: {
  alias: {
   '@atomic': path.resolve(__dirname, 'src/atomic'),
   '@assets': path.resolve(__dirname, 'src/assets'),
   '@components': path.resolve(__dirname, 'src/components'),
   '@data': path.resolve(__dirname, 'src/app/data'),
   '@domain': path.resolve(__dirname, 'src/app/domain'),
   '@': path.resolve(__dirname, 'src'),
  },
 },
});
