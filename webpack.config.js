const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    app: './front/community/app.js'
  },

  output: {
    path: path.join(__dirname, './public/javascripts'),
    filename: 'index.js'
  },

  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['babel-preset-react', 'babel-preset-es2015']
        }
      },
      {
        test: /(\.css|\.scss)$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
    ]
  },

  plugins: [
    // new Webpack.HotModuleReplacementPlugin() // 热加载
    // new webpack.optimize.UglifyJsPlugin(),  // 压缩打包的文件
    // new HtmlWebpackPlugin({template: './src/index.html'}),  // 生成html文件
    // new Webpack.BannerPlugin('This file is created by ning')  // 给输出的文件头部添加注释信息
  ]
};

module.exports = config;
