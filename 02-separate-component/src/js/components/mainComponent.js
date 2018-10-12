import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import * as Action from '../actions/rentals'
import RentalGrid from './rentalGrid';
import RentalBarChart from './RentalBarChart'

class MainComponent extends Component {
  componentWillMount() {
    this.props.dispatch(Action.fetchRentalsByCity())
    this.props.dispatch(Action.fetchRentalCountByCity())
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

const mapStateToProps = (state) => {
  return{
    rentalsByCityData: state.rentals.rentalsByCityData,
    rentalCountByCityData: state.rentals.rentalCountByCityData
  };
};

export default connect(mapStateToProps)(MainComponent);
