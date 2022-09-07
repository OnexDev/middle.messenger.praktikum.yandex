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
    'max-len': [1, 100],
    'no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-use-before-define': 2,
    'no-underscore-dangle': 0,
    'no-param-reassign': [2, { props: false }],
  },
};
