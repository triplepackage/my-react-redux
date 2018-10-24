import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import { connect } from "react-redux"
import * as Action from '../actions/rentals'

class RentalDoughnut extends Component {
  componentDidMount() {
    this.props.fetchRentalStatus();
  }

  render() {
    const { rentalStatusData } = this.props;

    let chartData = [];
    let chartLabel = [];

    rentalStatusData.forEach(function(rentalStatus) {
      chartData.push(parseInt(rentalStatus.count));
      chartLabel.push(rentalStatus.stat);
    });

    const doughnutData = {
      labels: chartLabel,
      datasets: [{
        data: chartData,
        backgroundColor: [
          '#FF6384',
          '#F6B8EB',
          '#FBCC56',
          '#FF7984',
          '#36A2EB',
          '#BCEE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#F6B8EB',
          '#FBCC56',
          '#FF7984',
          '#36A2EB',
          '#BCEE56'
        ]
      }]
    }

    return (
      <Doughnut data={doughnutData}  />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchRentalStatus: () => {
      dispatch(Action.fetchRentalStatus())
    }
  };
};

const mapStateToProps = (state) => {
  return{
    rentalStatusData: state.rentals.rentalStatusData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RentalDoughnut);
