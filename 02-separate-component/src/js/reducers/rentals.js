import { combineReducers } from "redux";

const initialState = {
  isRentalsByCityDataFetching: false,
  isRentalCountByCityDataFetching: false,
  rentalsByCityData: [],
  rentalCountByCityData: [],
  error: null,
};

export const rentals = (state=initialState, action) => {
    switch (action.type) {
      case "FETCH_RENTALS_BY_CITY": {
        return {...state, isRentalsByCityDataFetching: true}
      }
      case "FETCH_RENTALS_BY_CITY_REJECTED": {
        return {...state, isRentalsByCityDataFetching: false, error: action.payload}
      }
      case "FETCH_RENTALS_BY_CITY_FULFILLED": {
        return {
          ...state,
          isRentalsByCityDataFetching: false,
          rentalsByCityData: action.payload,
        }
      }
      case "FETCH_RENTAL_COUNT_BY_CITY": {
        return {...state, isRentalCountByCityDataFetching: true}
      }
      case "FETCH_RENTAL_COUNT_BY_CITY_REJECTED": {
        return {...state, isRentalCountByCityDataFetching: false, error: action.payload}
      }
      case "FETCH_RENTAL_COUNT_BY_CITY_FULFILLED": {
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
