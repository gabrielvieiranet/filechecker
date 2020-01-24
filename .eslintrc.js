module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
