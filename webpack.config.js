/**
 * webpack配置文件
 * 作用：指示webpack干哪些活
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
  },
  module: {
    rules: [
      // loader配置
      {
        test: /\.css$/,
        // 使用多个loader用use
        use: [
          // use数据中loader执行顺序：从右到左依次执行
          // 创建style标签，将js中的样式资源插入，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader',
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use:[
          'style-loader',
          'css-loader',
          // 需要下载node-sass和sass-loader
          'sass-loader'
        ]
      },
      {
        // 问题：默认处理不了html中的img
        test: /\.(jpe?g|png|gif)$/,
        // 使用单个loader可以直接用loader:,
        // url-loader依赖于file-loader，两个都需要下载
        loader: 'url-loader',
        options: {
          // 图片小于limit，则会转为base64形式
          // 优点：减少请求数量
          // 缺点：图片体积会更大
          limit: 50 * 1024,
          // // 使用commonjs解析
          // esModule: false,
          name: '[name].[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/i,
        // 处理html文件的img的图片（负责引入，从而能被url-loader处理）
        // for example - <img src="image.png">) is imported (const img = require('./image.png') or import img from "./image.png""
        loader: 'html-loader',
      }
    ]
  },
  plugins: [
    // 默认会创建一个空的html，自动引入打包输出的所有资源(Js/Css)
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  mode: 'development',
  // mode: 'production',
}