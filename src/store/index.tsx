
import { createStore } from 'redux';
import reducers from '../reducers';
import { AppState, ExampleState } from '../types';
import initState from './init-state';

export default function () {
  const store = createStore<AppState>(reducers, initState);
  return store;
}