import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: Replace 'your-repo-name' with your actual GitHub repo name
export default defineConfig({
    base: '/ruths-inventory-dashboard/',
  plugins: [react()],
});
