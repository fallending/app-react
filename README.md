# react-app

[React从入门到精通系列之(13)使用PropTypes进行类型检测](https://segmentfault.com/a/1190000007814801)
[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

## 依赖

```js
yarn add react              // react核心
yarn add react-dom          // 新版本react单独提取了渲染相关函数
yarn add react-router-dom   // 前端路由器
yarn add redux              // redux核心
yarn add redux-actions      // 提供的createAction 函数创建的Action
yarn add react-redux        // 为了把react组件挂载到redux
yarn add react-router-redux // 为了保持状态与路由同步
yarn add react-loadable     // 代码分割按需加载
yarn add prop-types         // 检查传入子组件的props参数类型，有效防止忘记子组件有哪些props参数
yarn add history            // 第3方的history，比较好用。也可以用react-router自带的

yarn add redux-thunk        // 除此之外还需要选择一种处理异步action的redux中间件 redux-thunk 或 redux-saga 或 redux-promise

yarn add babel-loader -D    // 解析js文件中的ES6+/JSX语法
yarn add css-loader -D      // 解析css模块（import的css文件）
yarn add eslint-loader -D   // 打包前检测语法规范要用
yarn add file-loader -D     // 解析所有的文件（字体、视频、音频等）
yarn add url-loader -D      // 与file-loader类似，但可以把小图片编码为base64
yarn add postcss-loader -D  // 自动为css添加-webkit-前缀等功能
yarn add less-loader -D     // 解析.less文件
yarn add sass-loader -D     // 解析.scss/.sass文件
yarn add style-loader -D    // 自动将最终css代码嵌入html文件(<style>标签)
yarn add csv-loader -D      // 解析office的表格excel文件
yarn add xml-loader -D      // 解析xml文件

yarn add babel-core -D          // babel核心，babel-loader依赖
yarn add less -D                // less-loader依赖
yarn add node-sass -D           // sass-loader依赖
yarn add autoprefixer -D        // postcss的插件
yarn add eslint -D              // eslint代码规范检测器
yarn add babel-eslint -D        // 让eslint支持一些新语法
yarn add babel-plugin-transform-class-properties -D  // 支持类中直接定义箭头函数
yarn add babel-plugin-transform-decorators-legacy -D // 支持ES8修饰器
yarn add babel-plugin-syntax-dynamic-import -D       // 支持异步import语法
yarn add babel-runtime -D       // 各种浏览器兼容性垫片函数
yarn add babel-plugin-transform-runtime -D  // 避免重复编译babel-runtime中的代码
yarn add babel-preset-env -D    // 自动识别浏览器环境运用对应的垫片库兼容ES6+语法
yarn add babel-preset-react -D  // 让babel支持解析JSX语法
yarn add eslint-plugin-react -D // 让eslint支持检测JSX语法

yarn add express -D             // node.js的后端框架，为了启动一个服务。选择express或koa。 
```

可以配置antd UI库，功能齐全，使用很方便

可以配置prettier，一键自动代码格式化，再也不必担心eslint报错

## 目录

```
/public                         // 静态文件夹
	favicon.ico                   // 网站小图标
	index.html                    // 主页模板
/src                            // 项目代码文件夹
  /actions                      // 所有的action行为js
  /assets                       // 所有资源文件（图片、视频等）
  /components                   // 所有公共纯组件（头部、底部、菜单导航）
  /containers                   // 所有业务模块有状态组件
  /reducers                     // 所有的reducer状态机操作函数
  /store                        // 数据中心
  /styles                       // 全局公共样式
  /util                         // 自定义工具函数
  /services											// 业务服务
  index.js                      // 项目入口js
.babelrc                        // babel 配置文件
.eslintrc.json                  // eslint配置文件
package.json                    // 项目基础配置文件
postcss.config.js               // postcss配置文件
server.js                       // 用于开发环境的本地服务js
webpack.dev.config.js           // 开发环境webpack配置文件
webpack.production.js           // 生产环境webpack配置文件
yarn.lock                       // yarn缓存
```

## 文件

> 配置/.babelrc文件

```
{
  "presets": [
    "babel-preset-env",    支持ES6+新语法
    "babel-preset-react"   支持react相关语法（JSX）
  ],
  "plugins": [
    "transform-runtime",            使用垫片库兼容各种浏览器
    "transform-decorators-legacy",  支持修饰器语法
    "transform-class-properties",   支持class类中直接定义箭头函数
    "syntax-dynamic-import",        支持异步import语法
    "react-loadable/babel"          这个在服务端渲染中使用代码分割有用，虽然现在没用，但还是留着吧
  ]
}
```


> 配置/.exlint.json

```
{
    "env": {
        "browser": true,    默认已声明浏览器端所有全局对象
        "commonjs": true,   默认已声明commonjs所有全局对象
        "es6": true,        默认已声明ES6+所有全局对象
        "jquery": true      默认已声明$符号
    },
    "parser": "babel-eslint", 使用babel-eslint插件定义的语法（支持ES6+）
    "extends": "plugin:react/recommended", 默认的语法规则，必须用这个，其他的要报错
    "parserOptions": {      更精细的语言配置
        "ecmaVersion": 8,   支持到ES8的所有新特性
        "ecmaFeatures": {   额外的规则
            "impliedStrict": true,                启动严格模式
            "experimentalObjectRestSpread": true, 启用实验性的 object rest/spread properties 支持
            "jsx": true                           jsx语法支持
        },
        "sourceType": "module"                    按照Ecma模块语法对代码进行检测
    },
    "plugins": [    插件
        "react",    eslint-plugin-react插件，支持react语法
    ],
    "rules": {     自定义的规则
        "semi": "warn",                         语句结尾要用分号，否则警告
        "no-cond-assign": "error",              禁止条件表达式中出现赋值操作符，否则报错
        "no-debugger": "error",                 禁用 debugger，否则报错
        "no-dupe-args": "error",                禁止 function 定义中出现重名参数
        "no-caller": "error",                   禁用 arguments.caller 或 arguments.callee
        "no-unmodified-loop-condition": "error",禁用一成不变的循环条件
        "no-with": "error",                     禁用with语句
        "no-catch-shadow": "error"              禁止 catch 子句的参数与外层作用域中的变量同名
    }
}
```

> 配置postcss.config.js文件

```
module.exports = {
  plugins: [require("autoprefixer")()]
};
```

> 配置webpack.dev.config.js

```
/** 这是用于开发环境的webpack配置文件 **/

const path = require("path");       // 获取绝对路径用
const webpack = require("webpack"); // webpack核心
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 动态生成html插件

module.exports = {
  mode: "development",             // 使用webpack推荐的开发环境配置
  entry: [
    "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr", // webpack热更新插件配置
    "./src/index.js"              // 指向项目入口
  ],
  output: {
    path: "/",            // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
    publicPath: "/",      // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
    filename: "bundle.js" // 编译后的文件名字
  },
  devtool: "inline-source-map", // 报错的时候在控制台输出哪一行报错
  context: __dirname,           // entry 和 module.rules.loader 选项相对于此目录开始解析
  module: {                     // 各种解析器配置
    rules: [
      {
        // 编译前通过eslint检查代码规范
        test: /\.js?$/,                          // 检查.js结尾的文件
        enforce: "pre",                          // 在编译之前执行
        use: ["eslint-loader"],                  // 使用哪些解析器
        include: path.resolve(__dirname, "src")  // 只解析这个目录下的文件
      },
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        // .css 解析
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,  // 配置为true的话，代码需要按模块的形式使用css，最终编译后class会带有一串hash码
              localIdentName: "[local]_[hash:base64:5]" // 定义最终编译class命名规则
            }
          },
          "postcss-loader"
        ]
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:5]"
            }
          },
          "postcss-loader",
          "less-loader"
        ],
        include: path.resolve(__dirname, "src")
      },
      {
        // .scss 解析
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:5]"
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, "src"),
          use: [
              "file-loader?name=assets/[name].[ext]"
          ]
      },
      {
        // 图片解析
        test: /\.(png|jpg|gif)(\?|$)/,
        include: path.resolve(__dirname, "src"),
          use: [
              "url-loader?limit=8192&name=assets/[name].[ext]" // 小于8KB的图片将被编译为base64
          ]
      },
      {
        // CSV/TSV文件解析
        test: /\.(csv|tsv)$/,
        use: [
           'csv-loader'
        ]
      },
      {
        // xml文件解析
        test: /\.xml$/,
        use: [
          'xml-loader'
         ]
      }
    ]
  },
  plugins: [
    //根据模板插入css/js等生成最终HTML
    new HtmlWebpackPlugin({
      filename: "index.html",          //生成的html存放路径，相对于 output.path
      favicon: "./public/favicon.ico", // 自动把favicon.ico图片加入html
      template: "./public/index.html", // html模板路径
      inject: true                     // 是否自动创建script标签，设为false则不会自动引入js
    }),
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".scss"] //后缀名自动补全
  }
};
```

> [配置webpack.production.config.js](https://github.com/fallending/app-react/blob/master/webpack.production.config.js)

> /server.js

```
/** 用于开发环境的服务启动 **/
const path = require("path");       // 获取绝对路径有用
const express = require("express"); // express服务器端框架
const bodyParser = require("body-parser"); // 解析post请求时body中带的参数
const env = process.env.NODE_ENV;   // 模式（dev开发环境，production生产环境）
const webpack = require("webpack"); // webpack核心
const webpackDevMiddleware = require("webpack-dev-middleware"); // webpack服务器
const webpackHotMiddleware = require("webpack-hot-middleware"); // HMR热更新中间件
const webpackConfig = require("./webpack.dev.config.js");       // webpack开发环境的配置文件

const app = express();                      // 实例化express服务
const DIST_DIR = webpackConfig.output.path; // webpack配置中设置的文件输出路径，所有文件存放在内存中
const PORT = 8888;                          // 服务启动端口号

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (env === "production") {
  // 如果是生产环境，则运行build文件夹中最终正式打包后的代码
  app.use(express.static("build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  // 否则就利用webpack配置启动开发环境
  const compiler = webpack(webpackConfig); // 实例化webpack
  app.use(
    webpackDevMiddleware(compiler, {
      // 挂载webpack小型服务器
      publicPath: webpackConfig.output.publicPath, // 对应webpack配置中的publicPath
      quiet: true, // 是否不输出启动时的相关信息
      stats: {
        colors: true, // 不同信息不同颜色
        timings: true // 输出各步骤消耗的时间
      }
    })
  );
  // 挂载HMR热更新中间件
  app.use(webpackHotMiddleware(compiler));
  // 所有请求都返回index.html
  app.get("*", (req, res, next) => {
    // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
    const filename = path.join(DIST_DIR, "index.html");
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });
}

/** 启动服务 **/
app.listen(PORT, () => {
  console.log("本地服务启动地址: http://localhost:%s", PORT);
});
```

## 模块

### redux概念

```
redux最重要的几个概念：

store 数据中心
action 行为动作
dispatch 分发
reducer 改变store数据的唯一方法

一般流程是：
①、用户点击按钮 
②、按钮被绑定了事件，事件触发action 
③、action中发送请求获取后台数据 
④、用dispatch把数据分发给reducer（redux自动触发对应的reducer） 
⑤、reducer中把得到的新数据存入store 
⑥、组件（页面）中获取store最新的数据，展现出来
```

## 帮助

### redux-actions

```
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import actions from '../../actionCreators/movie'

const getMovieList = createAction(type.MOVIE_LIST, actions.movieList)
const getMovieDetail = createAction(type.MOVIE_DETAIL, actions.movieDetail)

const actionCreators = {
  getMovieList: params => getMovieList(params),
  getMovieDetail,
}

export default {actionCreators}
```