/**
 * @knowledge
 * 
 * ``` import * as React from 'react'; ```
 * tsc 默认对于 commonjs 的模块是这样加载的: 
 * 
 * ``` import React from 'react'; ```
 * ts 提供了一个编译参数 allowSyntheticDefaultImports.
 * 
   ```
   {
      "allowSyntheticDefaultImports": true,
      "module": "esnext",
      "moduleResolution": "node"
   }
   ```
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import './styles/common.less';
import Root from "./containers/root";

/** 数据中心 **/
import store from './store';

const rootDom = document.getElementById('root');

// Render Example

// import Example from './components/example';
// ReactDOM.render(
//   <Example name="TypeScript" enthusiasmLevel={10} />,
//   document.getElementById('root') as HTMLElement
// );

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  rootDom
);

// if (module.hot) {
//   module.hot.accept();
// }