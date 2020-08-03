function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}

export default function combineReducers (reducers) {
  return function combination (state = {}, action) {
    // Official Redux uses `pick` on filtering reducers.
    // Let's trust reducers are functions here
    return mapValues(reducers, (reducer, key) => reducer(state[key], action))
  };
}
