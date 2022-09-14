module.exports = {
  extends: 'airbnb',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    window: true,
    document: true,
  },
  env: {
    browser: true,
  },
  rules: {
    'max-len': [1, 120],

    'no-use-before-define': 0,
    'no-unused-vars': 0,

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-use-before-define': 2,

    'class-methods-use-this': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,

    'no-underscore-dangle': 0,
    'no-param-reassign': [2, { props: false }],
    'linebreak-style': ['error', 'unix'],
  },
};
