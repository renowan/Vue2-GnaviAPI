module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parser: '',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  env: {
    browser: true
  },
  "globals" : {
    "Action"       : false,
    "__DEV__"      : false,
    "__PROD__"     : false,
    "__DEBUG__"    : false,
    "__DEBUG_NEW_WINDOW__" : false,
    "__BASENAME__" : false
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'camelcase': [0, {'properties': 'never'}],
    'no-unused-vars': [0, {"vars": "all", "args": "after-used"}],
    'comma-dangle': 0
  }
}
