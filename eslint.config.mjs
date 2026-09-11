import globals from 'globals';
import pluginTs from 'typescript-eslint';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { project: ['./tsconfig.base.json'] },
    },
    plugins: {
      '@typescript-eslint': pluginTs.plugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },
];
