import { combineReducers } from "redux";
import * as Action from '../actions/rentals';

const initialState = {
  isRentalsByCityDataFetching: false,
  isRentalCountByCityDataFetching: false,
  rentalsByCityData: [],
  rentalCountByCityData: [],
  error: null,
};

const rentals = (state=initialState, action) => {
    switch (action.type) {
      case Action.FETCH_RENTALS_BY_CITY: {
        return {...state, isRentalsByCityDataFetching: true}
      }
      case Action.FETCH_RENTALS_BY_CITY_REJECTED: {
        return {...state, isRentalsByCityDataFetching: false, error: action.payload}
      }
      case Action.FETCH_RENTALS_BY_CITY_FULFILLED: {
        return {
          ...state,
          isRentalsByCityDataFetching: false,
          rentalsByCityData: action.payload,
        }
      }
      case Action.FETCH_RENTAL_COUNT_BY_CITY: {
        return {...state, isRentalCountByCityDataFetching: true}
      }
      case Action.FETCH_RENTAL_COUNT_BY_CITY_REJECTED: {
        return {...state, isRentalCountByCityDataFetching: false, error: action.payload}
      }
      case Action.FETCH_RENTAL_COUNT_BY_CITY_FULFILLED: {
        return {
          ...state,
          isRentalCountByCityDataFetching: false,
          rentalCountByCityData: action.payload,
        }
      }
      default:
        return state;
    }
}

export const reducers = combineReducers({
  rentals
})
