import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import { connect } from "react-redux"
import * as Action from '../actions/rentals'

class RentalGrid extends Component {
  componentDidMount() {
    this.props.fetchRentalsByCity();
  }

  onRowClick = (state, rowInfo) => {
    return {
      onClick: e => {
        this.props.setCurrentRental(rowInfo.original);

        this.props.history.push({
          pathname: '/rental',
          search: '?recordId=' + rowInfo.original['recordId'],
          state: { detail: rowInfo.original }
        })
      }
    }
  }

  render() {
    const { rentalsByCityData } = this.props;

    const columns = [{
        id: 'streetNumber',
        Header: 'Street Number',
        accessor: d => d.streetNumber
      },
      {
        id: 'streetName',
        Header: 'Street Name',
        accessor: d => d.streetName
      },
      {
        id: 'city',
        Header: 'City',
        accessor: d => d.city
      },
      {
        id: 'zipCode',
        Header: 'Zip Code',
        accessor: d => d.zipCode
      },
      {
        id: 'issueDate',
        Header: 'Issue Date',
        accessor: d => d.issueDate
      },
      {
        id: 'expirationDate',
        Header: 'ExpirationDate ',
        accessor: d => d.expirationDate
      },
      {
        id: 'recordStatus',
        Header: 'Status',
        accessor: d => d.recordStatus
      }];

      return (
        <ReactTable
            data={rentalsByCityData}
            getTrProps={this.onRowClick}
            columns={columns}
            className="-striped -highlight"
          />
      );
    }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchRentalsByCity: () =>  dispatch(Action.fetchRentalsByCity()),
    setCurrentRental: (currentRental) => dispatch(Action.setCurrentRental(currentRental))
  }
};

const mapStateToProps = (state) => {
  return{
    rentalsByCityData: state.rentals.rentalsByCityData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RentalGrid);
