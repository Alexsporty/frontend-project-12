import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
    ],
  },

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ❌ ВЫКЛЮЧАЕМ СТИЛЬ
      '@stylistic/arrow-parens': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/jsx-wrap-multilines': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/jsx-closing-tag-location': 'off',
      '@stylistic/spaced-comment': 'off',

      // ✅ ОСТАВЛЯЕМ РЕАЛЬНЫЕ ОШИБКИ
      'no-unused-vars': 'warn',
      'no-undef': 'error',

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    files: ['playwright.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
