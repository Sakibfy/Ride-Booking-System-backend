// eslint.config.mjs
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.config({
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }),
];
