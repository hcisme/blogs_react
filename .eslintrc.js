module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],

  /**
   * 自定义校验规则
   * 0 => off, 1 => warn, 2 => error
   */
  rules: {
    'no-console': 1,
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-var': 2, //要求使用 let 或 const 而不是 var
    'react/prop-types': 0 //防止在react组件定义中缺少props验证
  }
};
