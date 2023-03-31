module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 0，1，2分别表示off, warning, error三个错误级别.
  rules: {
    // indent: ['error', 'space'],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-var': 2, //要求使用 let 或 const 而不是 var
    'react/prop-types': 0, //防止在react组件定义中缺少props验证
    'no-unused-vars': 'error'
  }
};
