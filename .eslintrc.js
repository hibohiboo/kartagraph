module.exports = {
  ignorePatterns: ['!.eslintrc.js', 'public'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'react-app',
    'react-app/jest',
  ],
  plugins: ['react'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
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
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'commma-dangle': 'off',
    'no-unused-vars': 'off',
    'no-duplicate-case': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'prettier/prettier': 'off',
    'react/display-name': 'off',
  },
}
