import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import { connect } from "react-redux"
import * as Action from '../actions/rentals'

class RentalBarChart extends Component {
  componentDidMount() {
    this.props.fetchRentalCountByCity();
  }

  render() {
    const { rentalCountByCityData } = this.props;

    let chartData = [];
    let chartLabel = [];

    rentalCountByCityData.forEach(function(rentalCount) {
      if(rentalCount.count > 50){
        chartData.push(parseInt(rentalCount.count));
        chartLabel.push(rentalCount.stat);
      }
    });

    const horizontalBarData = {
      labels: chartLabel,
      datasets: [
      {
        label: 'Rentals Per County',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2FB',
        borderWidth: 1,
        hoverBackgroundColor: '#3FA2EB',
        hoverBorderColor: '#3FF2EB',
        data: chartData
      }]
    }

    return (
      <HorizontalBar
        data = {horizontalBarData}
        onElementsClick = { elems => {
          this.props.setCurrentCity(chartLabel[elems[0]._index]);
          this.props.history.push({ pathname: '/datagrid' })
        }}/>);
    }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchRentalCountByCity: () => {
      dispatch(Action.fetchRentalCountByCity())
    },
    setCurrentCity: (city) => dispatch(Action.setCurrentCity(city)),
  };
};

const mapStateToProps = (state) => {
  return{
    rentalCountByCityData: state.rentals.rentalCountByCityData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RentalBarChart);
