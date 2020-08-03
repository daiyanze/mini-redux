
// Output the previous and current state in console
export default function logger({ getState }) {
  return next => action => {
    console.log("======== Redux Logger ========");

    console.log("Action Type: ", action.type);

    const prevState = getState();
    console.log("Prev: ", prevState);

    const returnValue = next(action);

    const nextState = getState();
    console.log("Next: ", nextState);
    console.log("==============================");
    return returnValue;
  };
}
