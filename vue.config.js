// const path = require("path");
module.exports = {
  lintOnSave: false, //关闭语法检查
  // 开启代理服务器（方式一）
  devServer: {
    proxy: "http://localhost:8080",
  },
  // 开启代理服务器（方式二）
  // devServer: {
  //   proxy: {
  //     "/wocao": {
  //       target: "http://localhost:5000",
  //       pathRewrite: { "^/wocao": "" },
  //       ws: true, // 用于支持websocket
  //       // changeOrigin: true // 用于控制请求头中的host值
  //     },
  //     "/diao": {
  //       target: "http://localhost:5001",
  //       pathRewrite: { "^/diao": "" },
  //       ws: true, // 用于支持websocket
  //       // changeOrigin: true // 用于控制请求头中的host值
  //     },
  //     // '/foo': {
  //     //     target: '<other_url>'
  //     // }
  //   },
  // },
  // build: {
  //   index: path.resolve(__dirname, "../dist/index.html"),
  //   assetsRoot: path.resolve(__dirname, "./dist"),
  //   assetssubDirectory: "static",
  //   assetsPublicPath: "./",
  // },
  // build: {
  //   assetsPublicPath: "./",
  // },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
};
