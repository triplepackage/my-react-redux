import axios from "axios";

export const fetchRentalsByCity = () => {
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

export const fetchRentalCountByCity = () => {
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
