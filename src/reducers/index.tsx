import { ExampleActions } from '../actions';
import { AppState, ExampleState } from '../types';
import { INCREMENT, DECREMENT } from '../constants';
import initState from '../store/init-state';
import { combineReducers } from 'redux';

// reducer
/**
 * ExampleState 对应的 reducer
 * @param state 
 * @param action 
 */
function exampleReducer(state: ExampleState = initState.example, action: ExampleActions): ExampleState {
  switch (action.type) {
    case INCREMENT:
      return { ...state, level: state.level + 1 };
    case DECREMENT:
      return { ...state, level: Math.max(1, state.level - 1) };
  }
  return state;
}

const rootReducer = combineReducers<AppState>({
  example: exampleReducer
});

export default rootReducer;