import React, { Component } from 'react';
import { connect } from "react-redux"
import {fetchRentalsByCity, fetchRentalCountByCity} from '../actions/rentals'
import RentalGrid from './rentalGrid';
import RentalBarChart from './RentalBarChart'
import { bindActionCreators } from 'redux';

@connect((store) => {
  return {
    rentalsByCityData: store.rentals.rentalsByCityData,
    rentalCountByCityData: store.rentals.rentalCountByCityData
  };
})
class MainComponent extends Component {
  componentWillMount() {
    this.props.dispatch(fetchRentalsByCity())
    this.props.dispatch(fetchRentalCountByCity())
  }

  render() {
      return (
      <div>
        <RentalGrid />
        <RentalBarChart />
      </div>
      )
    }
}

export default MainComponent;
