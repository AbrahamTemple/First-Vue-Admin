module.exports = {
  //基本路径
  // publicPath: "/dist/",
  //输出文件目录
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  //生产环境不需要生产map文件
  productionSourceMap: false,

  devServer: {
    port: 8080, // 端口
    open: false, // 自动开启浏览器
    compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://124.71.82.74:8079',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },

};
