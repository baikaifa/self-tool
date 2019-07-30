
### 初始化环境
* $ npm i

### 本地运行
* $ npm run dev

### 项目 打包上线
* $ npm run build

#### 项目结构

```
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist						// 项目打包后 $ npm run build 的打包文件
│   ├── index.html
│   └── static
├── index.html					// 首页入口文件
├── node_modules
├── package.json
├── src
│   ├── App.vue					// 项目入口文件
│   ├── assets					// 资源文件
│   │   └── css              // 全局css文件
│   │   └── img              // 图片，下面需要再分功能
│   │       └── global        // 无功能相关通用图片
│   │       └── mall          // 针对商城图片
│   │       └── community     // 针对社群图片
│   │       └── grassgrowing  // 针对种草图片
│   │       └── personal      // 针对个人中心图片
│   │       └── other         // 零散功能图片
│   ├── component					// 通用页面模块文件
│   ├── pages					// 页面
│   │   └── mall              // 商城
│   │   └── community         // 社群，微信群，qq群
│   │   └── grassgrowing      // 种草
│   │   └── personal          // 个人中心
│   │   └── other             // 一些零散的，其他再有功能，再单独处理
│   ├── router					// 路由与组件配置
│   │   └── index.js
│   ├── utils					// 工具类
│   │   └── request.js			// 请求相关集合
│   └── main.js					// 核心文件
└── static                 // 静态大文件位置
```



# 测试环境用第三方：
opn
express
http-proxy-middleware
friendly-errors-webpack-plugin
webpack-dev-middleware
webpack-hot-middleware
eventsource-polyfill

