const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const path = require("path");
const {
  configureBabelLoader,
  configureURLLoader,
  configureCSSLoader
} = require("./util");


const devServer = {
  proxy: {
    "/api": "http://localhost:55556"
  },
  contentBase: path.resolve(__dirname, "../dist"),
  hot: true,
  compress: true,
  overlay: true,
  open: true,
  port: 55555
};
module.exports = merge(baseConf, {
  mode: "development",
  cache: true,
  devtool: "eval-source-map",
  devServer,
  module: {
    rules: [
      configureCSSLoader(),
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 在babel-loader之前添加thread-loader。
          { loader: "thread-loader" },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
          // ...省略其他配置
        ]
      },
      ...configureURLLoader()
    ]
  }
});