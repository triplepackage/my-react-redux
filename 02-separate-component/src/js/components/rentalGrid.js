import React, { Component } from 'react';
import ReactTable from "react-table";
import { connect } from "react-redux"

class RentalGrid extends Component {
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

const mapStateToProps = (state) => {
  return{
    rentalsByCityData: state.rentalByCityReducer.data
  };
};

export default connect(mapStateToProps)(RentalGrid);
