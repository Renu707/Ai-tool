import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: [
        '@tanstack/react-query',
        '@radix-ui/react-separator',
        '@radix-ui/react-slot',
        '@radix-ui/react-toast',
        '@radix-ui/react-tooltip',
        '@radix-ui/react-select',
        'next-themes'
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          radix: [
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-select'
          ],
          themes: ['next-themes']
        },
        globals: {
          '@tanstack/react-query': 'ReactQuery',
          '@radix-ui/react-separator': 'RadixSeparator',
          '@radix-ui/react-slot': 'RadixSlot',
          '@radix-ui/react-toast': 'RadixToast',
          '@radix-ui/react-tooltip': 'RadixTooltip',
          '@radix-ui/react-select': 'RadixSelect',
          'next-themes': 'NextThemes'
        }
      },
    },
  },
});
