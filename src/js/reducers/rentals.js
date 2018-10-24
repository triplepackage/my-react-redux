import * as Action from '../actions/rentals';

const initialState = {
  isRentalsByCityDataFetching: false,
  isRentalCountByCityDataFetching: false,
  isRentalStatusDataFetching: false,
  rentalsByCityData: [],
  rentalCountByCityData: [],
  rentalStatusData: [],
  selectedRental: {},
  selectedCity: null,
  error: null,
};

export const rentals = (state=initialState, action) => {
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
      case Action.FETCH_RENTAL_STATUS: {
        return {...state, isRentalStatusDataFetching: true}
      }
      case Action.FETCH_RENTAL_STATUS_REJECTED: {
        return {...state, isRentalStatusDataFetching: false, error: action.payload}
      }
      case Action.FETCH_RENTAL_STATUS_FULFILLED: {
        return {
          ...state,
          isRentalStatusDataFetching: false,
          rentalStatusData: action.payload,
        }
      }
      case Action.SET_CURRENT_RENTAL: {
        return {
          ...state,
          selectedRental: action.rental,
        }
      }
      case Action.SET_CURRENT_CITY:{
        return {...state,
          selectedCity: action.city}
      }
      default:
        return state;
    }
}
