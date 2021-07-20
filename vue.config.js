module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 默认配置了src的别名：@
        "assets": "@/assets",
        "common": "@/common",
        "network": "@/network",
        "views": "@/views",
        "public": "@/../public",
        "components": "@/components",
        "mixins": "@/mixins"
      }
    }
  },
  // publicPath: '/dist/', // 打包文件相对路径
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    // proxy: {
    //   // 配置跨域
    //   '/api': {
    //     target: 'https://ele-interface.herokuapp.com/api/',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    before: app => { }
  }
}

/* 配置跨域请求 */