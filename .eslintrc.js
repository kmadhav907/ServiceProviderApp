module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'no-alert': 'warn',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
    'react-native/no-unused-styles': 'error',
  },
};
