module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error'],
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': ['error', { allow: ['_', '_id'] }],
    'no-console': 0,
    'global-require': 0,
  },
};
