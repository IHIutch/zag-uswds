import { defineConfig } from 'rolldown'

export default defineConfig({
  input: ['src/index.js', 'src/uswds-init.js'],
  output: {
    dir: 'dist',
    format: 'esm',
  },
})
