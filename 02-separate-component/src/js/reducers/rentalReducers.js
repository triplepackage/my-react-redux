import { combineReducers } from "redux";

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null,
};

export const rentalByCityReducer = (state=initialState, action) => {
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

export const rentalCountByCityReducer = (state=initialState, action) => {
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

export const reducers = combineReducers({
  rentalByCityReducer,
  rentalCountByCityReducer
})
