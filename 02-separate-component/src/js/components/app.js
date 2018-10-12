import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux";

import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import { reducers } from '../reducers/rentals'
import MainComponent from './mainComponent';

const middleware = applyMiddleware(promise(), thunk)
const store = createStore(reducers, middleware)

store.subscribe(() => {
  console.log("Store changed", store.getState());
})

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainComponent />
      </Provider>
    );
  }
}
