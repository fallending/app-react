
import { createStore } from 'redux';
import reducers from '../reducers/example';
import { StoreState } from '../types/example';
import initState from './init-state';

export default function () {
  const store = createStore<StoreState>(reducers, initState);
  return store;
}