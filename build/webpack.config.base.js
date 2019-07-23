const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");
const { templateFunction } = require("./util");
const DebugPlugin =require("debugtool-webpack-plugin");
const baseConf = {
  entry: { app: path.resolve(__dirname, "../src/app.js") },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: ""
  },
  mode: '',
  resolve: {
    modules: ["../node_modules", "../src/assets/auto"]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        enforce: "pre",
        options: {
          formatter: require("eslint-formatter-friendly")
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader:  "vue-loader",
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new DebugPlugin({ enable: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      title: "项目模板"
    }),
    new StyleLintPlugin({
      files: ["src/**/*.{vue, css, sass, scss}", "!src/assets/auto/"]
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "../src/assets/sprites"),
        glob: "*.png"
      },
      customTemplates: {
        function_based_template: templateFunction
      },
      target: {
        image: path.resolve(__dirname, "../src/assets/auto/sprite.png"),
        css: [
          [
            path.resolve(__dirname, "../src/assets/auto/sprite2.scss"),
            {
              format: "function_based_template"
            }
          ],
          path.resolve(__dirname, "../src/assets/generated/sprite.scss")
        ]
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })
  ]
}
module.exports = baseConf;
