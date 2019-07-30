const chromedriver = require("chromedriver");
module.exports = {
  src_folders: ["test/e2e/specs"],
  output_folder: "test/e2e/reports",
  // 设置全局模块的路径
  globals_path: "globalsModule.js",
  webdriver: {
    start_process: true,
    server_path: chromedriver.path,
    port: 9515
  },
  test_settings: {
    default: {
      webdriver:{
        server_path: chromedriver.path,
        port: 9515
      },
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    chrome: {
      webdriver:{
        server_path: chromedriver.path,
        port: 9515
      },
      desiredCapabilities: {
        browserName: "chrome"
      }
    }
  }
};