
function compose(...funcs) {
  return funcs.reduceRight((composed, f) => f(composed));
}

export default function applyMiddleware(...middlewares) {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    let dispatch = store.dispatch;
    const middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));

    // Enhance the `dispatchers` by applying middlewares to each of them
    dispatch = compose(...chain, store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}
