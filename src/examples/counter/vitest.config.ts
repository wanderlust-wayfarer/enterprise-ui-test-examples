import path from 'node:path';
import { defaultExclude, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      $components: path.resolve(__dirname, '../../components'),
      test: path.resolve(__dirname, 'test'),
    },
  },
  test: {
    globals: true,
    setupFiles: path.resolve(__dirname, './test/setup.ts'),
    exclude: [...defaultExclude, '**/*.svelte**'],
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'jsdom'],
      ['**/*.component.test.ts', 'jsdom'],
    ],
  },
});
