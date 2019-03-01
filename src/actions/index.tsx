import * as constants from '../constants'

export interface IncrementAction {
  type: constants.INCREMENT;
}

export interface DecrementAction {
  type: constants.DECREMENT;
}

export type ExampleActions = IncrementAction | DecrementAction;

export function increment(): IncrementAction {
  return {
    type: constants.INCREMENT
  }
}

export function decrement(): DecrementAction {
  return {
    type: constants.DECREMENT
  }
}