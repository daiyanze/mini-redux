export default function createStore (reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState;
  // Redux now uses a shallow copy `nextListeners` via `ensureCanMutateNextListeners()`
  // to prevent bugs in the middle of `dispatch`
  let currentListeners = [];

  function getState () {
    return currentState;
  }

  // Register callbacks to execute after changes
  function subscribe (listener) {
    currentListeners.push(listener);

    return () => {
      // empty listeners
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  function dispatch (action) {
    currentState = reducer(currentState, action);
    // state changes, notify to invoke callbacks
    currentListeners.forEach(listener => listener());
  }

  // Initialize Redux by calling a virtual reducer
  dispatch({ type: "MY-MINI-REDUX" });

  return {
    getState,
    dispatch,
    subscribe
  };
}
