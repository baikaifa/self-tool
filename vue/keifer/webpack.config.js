const path = require('path');
//启用热更新第二部
const webpack = require('webpack');
//导入在内存中生成HTML页面的插件
//只要是插件，一定要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {//输出文件相关的配置 
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'//指定输出的文件名称
    },
    devServer: {//配置dev-server命令参数第二种形式
        // --open --port 3000 --contentBase src --hot
        open: true,//自动打开浏览器
        port: 3000,//运行端口
        contentBase: 'src',//托管的根目录
        hot: true//启用热更新第一步
    },
    plugins: [//配置插件的节点
        new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象
        //使用html-webpack-plugin后不需要手动处理bundle.js引用路径插件自动创建
        new htmlWebpackPlugin({//创建一个在内存中生成HTML页面的插件
            template: path.join(__dirname, './src/index.html'),//指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html'//指定生成的页面的名称
        })
        //启动热更新的第三步
    ],
    module: {//这个节点,用于配置所有的第三方模块加载器
        rules: [//所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },//配置处理.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },//配置处理.less文件第三方loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=7631&name=[hash:8]-[name].[ext]'},//处理图片路径的loader limit给定的值是图片大小单位是byte，如果引用图片大于limit值，不会转为base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            //配置处理.scss文件的第三方loader规则
        ]
    }
}

//使用webpack-dev-server工具，实现自动打包编译的功能
//1.运行cnpm i webpack-dev-server -D 加入本地开发依赖
//本地安装webpack-dev-server无法直接运行
//package.json中加入 "dev": "webpack-dev-server"
//webpack-dev-server打包的bundle.js没有存放到物理磁盘上
//直接托管到电脑内存中，在项目根目录中找不到bundle.js
//cnpm i html-webpack-plugin -D 在内存中生成bundle.js
//cnpm i bootstrap -S




