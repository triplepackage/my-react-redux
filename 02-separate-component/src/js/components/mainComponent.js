import React, { Component } from 'react';
import { connect } from "react-redux"
import {fetchRentalsByCity, fetchRentalCountByCity} from '../actions/rentalActions'
import RentalGrid from './rentalGrid';
import RentalBarChart from './RentalBarChart'
import { bindActionCreators } from 'redux';

@connect((store) => {
  return {
    rentalsByCityData: store.rentalByCityReducer.data,
    rentalCountByCityData: store.rentalCountByCityReducer.data
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
