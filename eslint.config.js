import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([{
  files: ['**/*.js'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node
    }
  },
  plugins: {
    js,
    import: importPlugin
  },
  rules: {
    ...js.configs.recommended.rules,
    'quotes': ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'never'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'FunctionDeclaration',
        message: 'Use function expressions or arrow functions instead.'
      },
      {
        selector: 'ThisExpression',
        message: 'Avoid using "this". Prefer functional style.'
      },
      {
        selector: 'ClassDeclaration',
        message: 'Avoid class declarations. Prefer pure functions.'
      },
      {
        selector: 'SwitchStatement',
        message: 'Avoid using switch statements. Use object maps or if-else chains instead.'
      }
    ],
    'semi': ['error', 'never'],
    'no-extra-semi': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-arrow-callback': ['error'],
    'no-var': 'error',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'always',
        json: 'always',
        ignorePackages: true
      }
    ]
  },
  settings: {
    'import/extensions': ['.js', '.json'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.json']
      }
    }
  }
}])


