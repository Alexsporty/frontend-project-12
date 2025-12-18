/* eslint-disable no-undef */
import globals from 'globals';

export default {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    ...globals.browser,
    ...globals.node,
  },
  rules: {
    // Отключаем все stylistic правила
    '@stylistic/arrow-parens': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/jsx-wrap-multilines': 'off',
    '@stylistic/jsx-one-expression-per-line': 'off',
    '@stylistic/jsx-closing-tag-location': 'off',
    '@stylistic/spaced-comment': 'off',

    // Можно оставить реальные ошибки кода
    'no-unused-vars': 'warn',
    'no-undef': 'error',
  },
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
  ],
};
