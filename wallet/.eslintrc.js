const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error'
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
    // jest: true,
  },
  extends: ['standard', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prefer-regex-literals': RULES.OFF,
    'no-useless-constructor': RULES.OFF,
    'import/first': RULES.OFF
  }
};
