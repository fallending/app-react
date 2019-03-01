# react-js-migrate-to-ts

来自 @alisports/away 的整理

## 本源

> 基础包

```
/**
 * @brief 【核心代码】react的核心思想是虚拟Dom，是一个js的对象来表达一个dom描述
 * 
 * @required
 * @example 表达了一个div标签里面有一个span标签，标签里面是个文本节点，文字内容就是’hello,world‘
    {
      "tagName": "div",
      "attrs": {
          "styles": {
              "fontSize": "20px"
          }
      },
      "children": [
          {
              "tagName": "span",
              "children": ["hello,world"]
          }
      ]
    }
 * @demonstration react包包含了生成虚拟dom的函数react.createElement，以及Component这个类，我们自己写的类需要继承这个类，主要是继承一些react的高级方法
 */
react

/**
 * @brief 把虚拟Dom渲染到文档中变成实际dom
 * @required
 */
react-dom 

/**
 * @brief ts声明包，node_modules/@types/XX/index.d.ts可以查看
 */
@types/react
@types/react-dom

// 安装
npm i -D webpack -g
npm i -D webpack-cli -g

npm i --S react react-dom @types/react @types/react-dom
```

## TS 依赖

> TypeScript，ts-loader和source-map-loader

```
/**
 * @brief 让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码
 */
ts-loader

npm i -D typescript ts-loader source-map-loader
```

> [生成 tsconfig.json 配置文件](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)

tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项

```
{
  "compilerOptions": {
    "noImplicitAny": false, // true的话，TypeScript 编译器无法推断出类型时，它仍然会生成 JavaScript 文件，但是它也会报告一个错误。为了找到错误还是设置为true比较好
    "noEmitOnError": true,
    "removeComments": false,
    "sourceMap": true, // 把 ts 文件编译成 js 文件的时候，同时生成对应的sourceMap文件
    "target": "es5", // 转换成es5
    "module": "commonjs", // 模块代码规范，也可以选amd
    "jsx": "react", // TypeScript具有三种JSX模式：preserve，react和react-native。 这些模式只在代码生成阶段起作用 - 类型检查并不受影响。
    // 在preserve模式下生成代码中会保留JSX以供后续的转换操作使用（比如：Babel）。 另外，输出文件会带有.jsx扩展名。 
    // react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js。 
    // react-native相当于preserve，它也保留了所有的JSX，但是输出文件的扩展名是.js。
    "outDir": "./dist/", // 输出目录
  },
  "include": [ // 需要编译的目录
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

* [No inputs were found in config file 'tsconfig.json'. Specified 'include' paths were '["src/**/*"]' and 'exclude' paths were '["node_modules"]'](https://github.com/Microsoft/TypeScript/issues/17155)，不用担心，接着往下做即可

## js -> ts

> 改写入口文件

index.tsx

> webpack 配置文件

```
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
  ],
};
```

打开index.html就能看到我们写的页面

```
webpack --config webpack.common.config.js
```

接着，省略开发、生产环境的配置文件编写

## in redux

```
npm i -S redux react-redux @types/react-redux
```

## 其他

> 相对路径

webpack 配置将 src 目录配置在了 resolve 中

```
{
  resolve: {
    modules: ['node_modules', 'src']
  }
}
```

代码中, 可以通过 `import ‘App’ from ‘components/App’ 的方式引用 src/components/App.jsx 文件

在 typescript 中, 需要配置 baseUrl 或 paths 来告诉 tsc 寻找文件的路径.

```
"baseUrl": "./src",
```

或者

```
{
  compilerOptions: {
    "baseUrl": ".",
    "paths": {
      "*": [
        "src/*",
        "node_modules/*"
      ]
    }
  }
}
```

二者略有[不同](https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url). 从结论上看 paths 的方式会检测加载模块关联的声明, 对于声明缺失的模块编译时会抛出一个错误.

> 全局参数

对于项目中用到的全局变量, 以及 WebpackDefinePlugin 之类输出的东西, 我们可以建一个 src/global.d.ts 文件来声明进行声明, 比如:

```
declare const global: any
```

另一方面, webpack 通过X-loader 加载 js 之外的文件加载. 这些东西 tsc 看不懂, 就会报错. 我们希望 tsc 在 type checking 时能跳过这些模块, 也可以在 *global.d.ts* 里加上模块的声明:

```
declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
declare module '*.mp4'
// ...
```

*WebpackDefinePlugin* 会输出一个 process 变量来同步一部分配置文件到前端. 一开始我是拒绝在面向 browser 的项目引用 @types/node , 而是通过 global.d.ts 引入的. 然而很多第三方的模块会带入 @types/node 造成重复声明的异常, 最后只好直接显式的引入 *@types/node* 了.

