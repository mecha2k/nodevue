module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2020: true
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: 11
  },
  plugins: ["vue"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
}
