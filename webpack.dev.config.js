/** 这是用于开发环境的webpack配置文件 **/

const path = require("path"); // 获取绝对路径用
const webpack = require("webpack"); // webpack核心
const package = require('./package.json');

// variables
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 动态生成html插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');


module.exports = {
  context: __dirname, // entry 和 module.rules.loader 选项相对于此目录开始解析
  mode: "development",
  entry: [
    // "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr", // webpack热更新插件
    "./src/index.tsx" // 项目入口
  ],
  output: {
    path:  __dirname + "/", // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
    publicPath: __dirname + "/", // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
    filename: "bundle.js", //编译后的文件名字
    // historyApiFallback: {
    //   index: './index.html'
    // },
    chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js'
  },

  // devServer: {
  //   contentBase: sourcePath,
  //   hot: true,
  //   inline: true,
  //   historyApiFallback: {
  //     disableDotRule: true
  //   },
  //   stats: 'minimal',
  //   clientLogLevel: 'warning'
  // },
  devtool: "inline-source-map", // 报错的时候在控制台输出哪一行报错
  // devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',

  module: {
    rules: [
      // WARNING: now
      { test: /\.tsx?$/, loader: "ts-loader" },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      // WARNING: origin
      {
        // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        test: /\.js?$/,
        enforce: "pre",
        use: ["eslint-loader"],
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
              modules: true,
              localIdentName: "[local]_[hash:base64:5]"
            }
          },
          "postcss-loader"
        ]
      },
      {
        // .less 解析 (用于解析antd的LESS文件)
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          `less-loader`
        ],
        include: path.resolve(__dirname, "node_modules")
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
              "url-loader?limit=8192&name=assets/[name].[ext]"
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

  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: isProduction ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      filename: "index.html", //生成的html存放路径，相对于 output.path
      favicon: "./public/favicon.ico", // 自动把根目录下的favicon.ico图片加入html
      template: "./public/index.html", //html模板路径
      inject: true, // 是否将js放在body的末尾
      template: 'assets/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
      },
      meta: {
        title: package.name,
        description: package.description,
        keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined
      }
    }),
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"], //后缀名自动补全
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};
