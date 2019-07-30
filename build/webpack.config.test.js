const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const {
  configureBabelLoader,
  configureURLLoader,
  configureCSSLoader
} = require("./util");

let testConf = merge(baseConf, {
  mode:'development',
  devtool: "inline-source-map",
  module: {
    rules: [
      configureCSSLoader(),
      configureBabelLoader(),
      ...configureURLLoader()
    ]
  }
});
// 不需要webpack的入口
delete testConf.entry;
module.exports = testConf;