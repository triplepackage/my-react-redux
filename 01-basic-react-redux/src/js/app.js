import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from "axios";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";
import { connect } from "react-redux"
import { Provider } from 'react-redux';

//Action Creators
const fetchRentalsByCity = () => {
  return function(dispatch) {
    dispatch({type: "FETCH_RENTALS_BY_CITY"});

    axios.get("http://localhost:8080/api/rentals/city/nottingham")
      .then((response) => {
        dispatch({type: "FETCH_RENTALS_BY_CITY_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_RENTALS_BY_CITY_REJECTED", payload: err})
      })
  }
}

const fetchRentalCountByCity = () => {
  return function(dispatch) {
    dispatch({type: "FETCH_RENTAL_COUNT_BY_CITY"});

    axios.get("http://localhost:8080/api/rentals/groupedby/city")
      .then((response) => {
        dispatch({type: "FETCH_RENTAL_COUNT_BY_CITY_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_RENTAL_COUNT_BY_CITY_REJECTED", payload: err})
      })
  }
}

//Reducers
const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null,
};

const rentalByCityReducer = (state=initialState, action) => {
    switch (action.type) {
      case "FETCH_RENTALS_BY_CITY": {
        return {...state, fetching: true}
      }
      case "FETCH_RENTALS_BY_CITY_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_RENTALS_BY_CITY_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload,
        }
      }
    }
    return state
}

const rentalCountByCityReducer = (state=initialState, action) => {
    switch (action.type) {
      case "FETCH_RENTAL_COUNT_BY_CITY": {
        return {...state, fetching: true}
      }
      case "FETCH_RENTAL_COUNT_BY_CITY_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_RENTAL_COUNT_BY_CITY_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload,
        }
      }
    }
    return state
}

const reducers = combineReducers({
  rentalByCityReducer,
  rentalCountByCityReducer
})

const middleware = applyMiddleware(promise(), thunk)
const store = createStore(reducers, middleware)

store.subscribe(() => {
  console.log("Store changed", store.getState());
})


//Components
@connect((store) => {
  return {
    rentalsByCityData: store.rentalByCityReducer.data,
    rentalCountByCityData: store.rentalCountByCityReducer.data
  };
})

class RentalGrid extends Component {
  componentWillMount() {
    this.props.dispatch(fetchRentalsByCity())
    this.props.dispatch(fetchRentalCountByCity())
  }

  render() {
    const { rentalsByCityData } = this.props;

    const columns = [{
        id: 'streetNumber',
        Header: 'Street Number',
        accessor: d => d.streetNumber
      },
      {
        id: 'streetName',
        Header: 'Street Name',
        accessor: d => d.streetName
      },
      {
        id: 'city',
        Header: 'City',
        accessor: d => d.city
      },
      {
        id: 'zipCode',
        Header: 'Zip Code',
        accessor: d => d.zipCode
      },
      {
        id: 'issueDate',
        Header: 'Issue Date',
        accessor: d => d.issueDate
      },
      {
        id: 'expirationDate',
        Header: 'ExpirationDate ',
        accessor: d => d.expirationDate
      },
      {
        id: 'recordStatus',
        Header: 'Status',
        accessor: d => d.recordStatus
      }];

      return (
        <ReactTable
            data={rentalsByCityData}
            columns={columns}
            className="-striped -highlight"
          />
      );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <RentalGrid />
     </Provider>
    , document.getElementById('root')
)
