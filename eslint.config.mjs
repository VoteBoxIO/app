import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['node_modules/', 'dist/'], // Directories to ignore
  },
  js.configs.recommended, // Basic JavaScript recommendations
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        window: 'readonly', // Define browser globals
        document: 'readonly', // Define browser globals
        console: 'readonly',
        module: 'writable', // Define Node.js globals
        process: 'readonly', // Define Node.js globals
      },
    },
    plugins: {
      react,
      '@typescript-eslint': typescript,
      prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      'prettier/prettier': 'error', // Enforce Prettier rules
      'no-unused-vars': [
        'ignore',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the version of React
      },
    },
  },
]
