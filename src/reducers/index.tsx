import { ExampleActions } from '../actions';
import { StoreState } from '../types';
import { INCREMENT, DECREMENT } from '../constants';
import initState from '../store/init-state';
import { combineReducers } from 'redux';

// 这是其中一个reducer
function enthusiasm(state: StoreState = initState, action: ExampleActions): StoreState {
  switch (action.type) {
    case INCREMENT:
      return { ...state, level: state.level + 1 };
    case DECREMENT:
      return { ...state, level: Math.max(1, state.level - 1) };
  }
  return state;
}

const rootReducer = combineReducers<StoreState>({
  enthusiasm
});

export default rootReducer;