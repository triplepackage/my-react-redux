import axios from "axios";

export const FETCH_RENTALS_BY_CITY = "FETCH_RENTALS_BY_CITY";
export const FETCH_RENTALS_BY_CITY_REJECTED = "FETCH_RENTALS_BY_CITY_REJECTED";
export const FETCH_RENTALS_BY_CITY_FULFILLED = "FETCH_RENTALS_BY_CITY_FULFILLED";
export const FETCH_RENTAL_COUNT_BY_CITY = "FETCH_RENTAL_COUNT_BY_CITY";
export const FETCH_RENTAL_COUNT_BY_CITY_REJECTED = "FETCH_RENTAL_COUNT_BY_CITY_REJECTED";
export const FETCH_RENTAL_COUNT_BY_CITY_FULFILLED = "FETCH_RENTAL_COUNT_BY_CITY_FULFILLED";
export const FETCH_RENTAL_STATUS = "FETCH_RENTAL_STATUS";
export const FETCH_RENTAL_STATUS_REJECTED = "FETCH_RENTAL_STATUS_REJECTED";
export const FETCH_RENTAL_STATUS_FULFILLED = "FETCH_RENTAL_STATUS_FULFILLED";
export const SET_CURRENT_RENTAL = "SET_CURRENT_RENTAL";
export const SET_CURRENT_CITY= "SET_CURRENT_CITY";

export const fetchRentalsByCity = (city) => {
  return function(dispatch) {
    dispatch({type: FETCH_RENTALS_BY_CITY});

    axios.get(process.env.RENTAL_API_URL + "rentals/city/" + city)
      .then((response) => {
        dispatch({type: FETCH_RENTALS_BY_CITY_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: FETCH_RENTALS_BY_CITY_REJECTED, payload: err})
      })
  }
}

export const fetchRentalCountByCity = () => {
  return function(dispatch) {
    dispatch({type: FETCH_RENTAL_COUNT_BY_CITY});

    axios.get(process.env.RENTAL_API_URL + "rentals/groupedby/city")
      .then((response) => {
        dispatch({type: FETCH_RENTAL_COUNT_BY_CITY_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: FETCH_RENTAL_COUNT_BY_CITY_REJECTED, payload: err})
      })
  }
}

export const fetchRentalStatus = () => {
  return function(dispatch) {
    dispatch({type: FETCH_RENTAL_STATUS});

    axios.get(process.env.RENTAL_API_URL + "rentals/groupedby/recordStatus")
      .then((response) => {
        dispatch({type: FETCH_RENTAL_STATUS_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: FETCH_RENTAL_STATUS_REJECTED, payload: err})
      })
  }
}

export const setCurrentRental = (currentRental) => {
  return function(dispatch) {
    dispatch({type: SET_CURRENT_RENTAL, rental: currentRental});
  }
}

export const setCurrentCity= (city) => {
  return function(dispatch) {
    dispatch({type: SET_CURRENT_CITY, city: city});
  }
}
