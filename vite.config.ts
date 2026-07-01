import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '个人衣橱管理',
        short_name: '衣橱',
        description: '离线可用的个人衣橱管理 PWA',
        theme_color: '#A8B5A2',
        background_color: '#F8F6F1',
        display: 'standalone',
        icons: [
          { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      }
    })
  ]
});
