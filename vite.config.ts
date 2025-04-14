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
        '@radix-ui/react-dialog',
        '@radix-ui/react-portal',
        '@radix-ui/react-primitive',
        '@radix-ui/react-use-callback-ref',
        '@radix-ui/react-use-controllable-state',
        '@radix-ui/react-context',
        '@radix-ui/react-compose-refs',
        '@radix-ui/react-presence',
        '@radix-ui/react-focus-guards',
        '@radix-ui/react-focus-scope',
        '@radix-ui/react-id',
        '@radix-ui/react-use-layout-effect',
        '@radix-ui/react-dismissable-layer',
        '@radix-ui/react-remove-scroll',
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
            '@radix-ui/react-select',
            '@radix-ui/react-dialog',
            '@radix-ui/react-portal',
            '@radix-ui/react-primitive'
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
          '@radix-ui/react-dialog': 'RadixDialog',
          '@radix-ui/react-portal': 'RadixPortal',
          '@radix-ui/react-primitive': 'RadixPrimitive',
          '@radix-ui/react-use-callback-ref': 'RadixUseCallbackRef',
          '@radix-ui/react-use-controllable-state': 'RadixUseControllableState',
          '@radix-ui/react-context': 'RadixContext',
          '@radix-ui/react-compose-refs': 'RadixComposeRefs',
          '@radix-ui/react-presence': 'RadixPresence',
          '@radix-ui/react-focus-guards': 'RadixFocusGuards',
          '@radix-ui/react-focus-scope': 'RadixFocusScope',
          '@radix-ui/react-id': 'RadixId',
          '@radix-ui/react-use-layout-effect': 'RadixUseLayoutEffect',
          '@radix-ui/react-dismissable-layer': 'RadixDismissableLayer',
          '@radix-ui/react-remove-scroll': 'RadixRemoveScroll',
          'next-themes': 'NextThemes'
        }
      },
    },
  },
});
