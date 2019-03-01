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

// Render Example With Redux
import configureStore from './store';
import Example from './containers';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('root') as HTMLElement
);