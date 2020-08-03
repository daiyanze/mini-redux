import React, { Component } from 'react';
import store from '../store'

export default class MiniReduxComp extends Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  plus = () => store.dispatch({ type: "PLUS" })

  minus = () => store.dispatch({ type: 'MINUS' })

  multiply = () => store.dispatch((dispatch, getState) => {
    setTimeout(() => {
      dispatch({ type: 'MULTIPLY' })
    }, 300)
  })

  divide = () => store.dispatch((dispatch, getState) => {
    setTimeout(() => {
      dispatch({ type: 'DIVIDE' })
    }, 300)
  })

  render() {
    return (
      <div>
        <h4>Plus / Minus 1</h4>

        <p>{store.getState().count}</p>

        <button onClick={this.plus}>+1</button>
        <button onClick={this.minus}>-1</button>

        <br />
        <br />

        <h4>Multiply / Divide 2 (0.3s delay)</h4>
        <p>{store.getState().double}</p>

        <button onClick={this.multiply}>x2</button>
        <button onClick={this.divide}>/2</button>
      </div>
    );
  }
}
