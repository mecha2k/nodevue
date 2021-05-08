module.exports = {
  devServer: {
    port: 8082,
    https: false
  },
  chainWebpack: (config) => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .tap((options) => {
        options.fix = true
        return options
      })
  }
}
