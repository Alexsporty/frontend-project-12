import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'build/**'],
  },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      // stylistic — выключаем полностью
      '@stylistic/arrow-parens': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/jsx-wrap-multilines': 'off',
      '@stylistic/jsx-closing-tag-location': 'off',
      '@stylistic/spaced-comment': 'off',

      // полезное
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
    },
  },

  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier, // 🔥 обязательно последним
]
