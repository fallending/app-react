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

// Render Example

// import Example from './components/example';
// ReactDOM.render(
//   <Example name="TypeScript" level={10} />,
//   document.getElementById('root') as HTMLElement
// );

// Render Example With Redux
import configureStore from './store/example';
import Example from './containers/example';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// Render Origin

// import Root from "./containers/root";

// ReactDOM.render(
//   <Provider store={store}>
//     <Root />
//   </Provider>,
//   document.getElementById('root') as HTMLElement
// );

// if (module.hot) {
//   module.hot.accept();
// }