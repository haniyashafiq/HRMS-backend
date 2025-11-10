import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Base JS + Node rules
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    plugins: {
      // you don’t need to call this "js" — ESLint automatically merges configs
    },
    extends: [
      js.configs.recommended, // base ESLint recommended rules
      ...tseslint.configs.recommended, // adds TypeScript support
      prettier, // disables conflicting rules
    ],
    rules: {
      // optional customizations:
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
])
