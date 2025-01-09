import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Zet hier de naam van je repository
export default defineConfig({
  plugins: [react()],
  base: '/groene-thermometer-demos/', // Vervang <repo-naam> door de naam van je GitHub repository
});