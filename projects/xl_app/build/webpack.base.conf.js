var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var webpack = require('webpack');
require('babel-polyfill');
// CSS压缩丑化
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// JavaScript压缩丑化
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['babel-polyfill','./src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('static'),
          resolve('test'),
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!stylus-loader',
        include: []
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ],
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    // new webpack.ProvidePlugin({
    //   jQuery: "jquery",
    //   $: "jquery"
    // }),
    new VueLoaderPlugin({

    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false,
    //       drop_debugger: true,
    //       drop_console: true
    //     },
    //     mangle: {
    //       safari10: true
    //     }
    //   },
    //   // sourceMap: true,
    //   sourceMap: config.build.productionSourceMap,
    //   parallel: true
    // }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: {
          inline: false
        }
      }
    }),

  ]
}
