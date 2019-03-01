import Example from '../components/example';
import * as actions from '../actions';
import { AppState } from '../types';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps( { example: { level, languageName } } : AppState) {
  return {
    level,
    name: languageName,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ExampleActions>) {
  return {
    onIncrement: () => dispatch(actions.increment()),
    onDecrement: () => dispatch(actions.decrement()),
  }
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps)(Example);

// export default connect(mapStateToProps, mapDispatchToProps)(Example);