import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux";

import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import {reducers} from './reducers/rentalReducers'
import RentalGrid from './components/rentalGrid';



const middleware = applyMiddleware(promise(), thunk)
const store = createStore(reducers, middleware)

store.subscribe(() => {
  console.log("Store changed", store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <RentalGrid />
     </Provider>
    , document.getElementById('root')
)
