import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import Moment from 'react-moment';
import { connect } from "react-redux"
import * as Action from '../actions/rentals'

class RentalGrid extends Component {
  componentDidMount() {
    let selectedCity = this.props.selectedCity == null ? process.env.DEFAULT_RENTAL_CITY : this.props.selectedCity;
    this.props.fetchRentalsByCity(selectedCity);
  }

  alignLeft = (text) => {
    return <div style={{textAlign: "left"}}>{text}</div>
  }

  onRowClick = (state, rowInfo) => {
    return {
      onClick: e => {
        this.props.setCurrentRental(rowInfo.original);
        this.props.history.push({
          pathname: '/rental'
        })
      }
    }
  }

  render() {
    const { rentalsByCityData } = this.props;

    const columns = [{
        id: 'streetNumber',
        Header: this.alignLeft("Street Number"),
        accessor: d => d.streetNumber
      },
      {
        id: 'streetName',
        Header: this.alignLeft("Street Name"),
        accessor: d => d.streetName
      },
      {
        id: 'city',
        Header: this.alignLeft("City"),
        accessor: d => d.city
      },
      {
        id: 'zipCode',
        Header: this.alignLeft("Zip Code"),
        accessor: d => d.zipCode
      },
      {
        id: 'issueDate',
        Header: this.alignLeft("Issue Date"),
        accessor: d => d.issueDate
      },
      {
        id: 'expirationDate',
        Header: () => this.alignLeft("Expiration Date"),
        accessor: d => d.expirationDate
      },
      {
        id: 'recordStatus',
        Header: this.alignLeft("Status"),
        accessor: d => d.recordStatus
      }];

      return (
        <ReactTable
            data={rentalsByCityData}
            getTrProps={this.onRowClick}
            columns={columns}
            className="-striped -highlight"
            loading={this.props.isRentalsByCityDataFetching}
          />
      );
    }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchRentalsByCity: (city) =>  dispatch(Action.fetchRentalsByCity(city)),
    setCurrentRental: (currentRental) => dispatch(Action.setCurrentRental(currentRental))
  }
};

const mapStateToProps = (state) => {
  return{
    rentalsByCityData: state.rentals.rentalsByCityData,
    isRentalsByCityDataFetching : state.rentals.isRentalsByCityDataFetching,
    selectedCity: state.rentals.selectedCity
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RentalGrid);
