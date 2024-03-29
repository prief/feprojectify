// Karma configuration
var webpackConfig = require("../../build/webpack.config.test");
module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],
    files: ["./index.js"],
    preprocessors: {
      "./index.js": ["webpack", "sourcemap"]
    },
    browsers: ["Chrome"],
    webpack: webpackConfig,
    reporters: ["spec","coverage"],
    port: 9876
  });
};