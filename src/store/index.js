import { createStore, applyMiddleware, combineReducers } from "../mini-redux/"
import { thunk, logger } from '../middlewares'

function addMinusReducer(state = 0, action) {
  switch (action.type) {
    case "PLUS":
      return state + 1;
    case "MINUS":
      return state - (action.payload || 1);
    default:
      return state;
  }
}

function MultiplyDivideReducer (state = 2, action) {
  switch (action.type) {
    case "MULTIPLY":
      return state * 2;
    case "DIVIDE":
      return state / 2;
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    count: addMinusReducer,
    double: MultiplyDivideReducer
  }),
  applyMiddleware(thunk, logger)
);

export default store;
