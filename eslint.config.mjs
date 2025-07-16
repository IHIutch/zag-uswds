import antfu from '@antfu/eslint-config'

export default antfu({
  pnpm: true,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  ignores: [
    '**/packages/compat/src/**',
  ],
})
