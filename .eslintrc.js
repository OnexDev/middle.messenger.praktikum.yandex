module.exports = {
  extends: 'airbnb',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 2,
    'max-len': [1, 100],
    'max-params': [2, 3],
    '@typescript-eslint/no-unused-vars': 2,
  },
};
