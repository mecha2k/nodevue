const nodeExternals = require("webpack-node-externals")

module.exports = {
  entry: "./index.js",
  output: { filename: "./bundle.js" },
  target: "node",
  externals: [nodeExternals()]
}
