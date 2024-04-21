import * as path from 'path'

module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@assets', path.resolve(__dirname, './src/assets')],
          ['@components', path.resolve(__dirname, './src/components')],
          ['@hooks', path.resolve(__dirname, './src/hooks')],
          ['@pages', path.resolve(__dirname, './src/pages')],
          ['@redux', path.resolve(__dirname, './src/redux')],
          ['@routers', path.resolve(__dirname, './src/routers')],
          ['@types', path.resolve(__dirname, './src/types')],
          ['@utils', path.resolve(__dirname, './src/utils')],
          ['@services', path.resolve(__dirname, './src/services')],
          ['@mock', path.resolve(__dirname, './src/mock')],
        ],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/prop-types': 0,
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
