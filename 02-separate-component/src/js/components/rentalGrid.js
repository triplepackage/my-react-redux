import React, { Component } from 'react';
import ReactTable from "react-table";
import { connect } from "react-redux"
import * as Action from '../actions/rentals'

class RentalGrid extends Component {
  componentDidMount() {
    this.props.fetchRentalsByCity();
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
            columns={columns}
            className="-striped -highlight"
          />
      );
    }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchRentalsByCity: () => {
      dispatch(Action.fetchRentalsByCity())
    }
  };
};

const mapStateToProps = (state) => {
  return{
    rentalsByCityData: state.rentals.rentalsByCityData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RentalGrid);
