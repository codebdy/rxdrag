module.exports = {
  extends: ['turbo', 'react-app', 'plugin:cypress/recommended'],
  globals: {
    vi: true
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ]
      }
    ],
    'import/no-anonymous-default-export': 'off',
    'prefer-const': ['error']
  },
  plugins: ['cypress']
};
