import { combineReducers } from 'redux';

const reducer1 = action => {
  switch (action) {
  case 'ADD_TODO':
    return 'hello';
  case 'TOGGLE_TODO':
    return 'goodbye';
  default:
    return 'meh';
  }
};

const reducer2 = action => {
  switch (action) {
  case 'ADD_TODO':
    return 'hello';
  case 'TOGGLE_TODO':
    return 'goodbye';
  default:
    return 'meh';
  }
};

let reducers = combineReducers({reducer1, reducer2});

export default reducers;
