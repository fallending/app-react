/**
 * 根reducer
 * 用于结合 App 中所有的 reducer.
 * 由于Redux中只能有一个store和一个reducer ,
 * 因此不要创建多个store，使用 combineReducers 来把多个 reducer 合并成一个根 reducer
 */

import { EnthusiasmAction } from '../actions';
import { StoreState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';

export function enthusiasm(state: StoreState, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
  }
  return state;
}

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import appReducer from "./app-reducer";

const RootReducer = combineReducers({
  // 注意一定要加上routing: routerReducer 这是用于redux和react-router的连接
  routing: routerReducer,
  // 其他自定义的reducer
  app: appReducer // 这里的命名，会成为store命名空间，组件中根据命名来获取对应reducer中的数据
});

export default RootReducer;
