const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const webpack = require('webpack')
const TerserWebpackPlugin = require("terser-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const {
  configureBabelLoader,
  configureURLLoader,
  configureCSSLoader
} = require("./util");

module.exports = function (
  options = {
    env: "test", // prod
    buildMode: "common", // modern || legacy
    browserslist: ""
  }
) {
  let { env, buildMode, browserslist } = options;
  let filename = "js/[name].js";
  env = env === "prod" ? env : "test";
  if (buildMode !== "legacy" && buildMode !== "modern") {
    buildMode = "common";
  }
  if (!Array.isArray(browserslist)) {
    browserslist = null;
  }
  let plugins = [new TerserWebpackPlugin({
    exclude: /node_modules/,
  }), new OptimizeCSSPlugin({
    assetNameRegExp: /\.optimize\.css$/g
  }), new webpack.HashedModuleIdsPlugin() // 引入的包的hash变化的问题
  ];
 

  let modern = buildMode === "common" ? false : true;
  let postfix = buildMode === "common" ? "" : `-${buildMode}`;
  let rules = [
    configureCSSLoader(env),
    configureBabelLoader(modern, browserslist),
    ...configureURLLoader(env)
  ];

  if (env === "prod") {
    filename = `js/[name]${postfix}.[chunkhash:8].js`;
    plugins.push(new ExtractTextPlugin("css/[name].[hash:8].css"));
  } else {
    filename = `js/[name]${postfix}.js`;
    plugins.push(new ExtractTextPlugin("css/[name].css"));
  }
  // 构建模式是modern时
  if (buildMode === "modern") {
    plugins.push(
      new ModernBuildPlugin({ modern: true }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!js", "!js/*"]
      })
    );
  }

  // 构建模式是legacy时
  if (buildMode === "legacy") {
    plugins.push(
      new ModernBuildPlugin({ modern: false }),
      new CleanWebpackPlugin()
    );
  }

  // 构建模式是普通构建
  if (buildMode === "common") {
    plugins.push(new CleanWebpackPlugin());
  }
  const prodConf = {
    mode:'production',
    output: {
      filename
    },
    module: { rules },
    plugins,
    optimization: {
      splitChunks: {
        chunks: 'async', // initial || all
        minSize: 30000, // 压缩前多少kb会被抽出
        minChunks: 1, // 被引用多少次就被抽出
        maxAsyncRequests: 5, // 按需加载时最大并行请求数
        maxInitialRequests: 3, // 入口文件最大并行请求数
        automaticNameDelimiter: '~', // 抽出的文件命名连接符
        name: true, //抽出块的文件名字
        cacheGroups: {  // 符合条件的都被抽出
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: "single" // webpack运行时代码抽离到独立的文件runtime.js
    }
  };

  return merge(baseConf, prodConf);
};