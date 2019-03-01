
import { createStore } from 'redux';
import reducers from '../reducers';
import { StoreState } from '../types';
import initState from './init-state';

export default function () {
  const store = createStore<StoreState>(reducers, initState);
  return store;
}