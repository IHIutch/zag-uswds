import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  target: 'es2020',
  format: ['esm', 'cjs'],
  // external: ['esbuild', 'fsevents'],
})
