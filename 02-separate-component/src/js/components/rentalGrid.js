import React, { Component } from 'react';
import ReactTable from "react-table";
import { connect } from "react-redux"
import {fetchRentalsByCity, fetchRentalCountByCity} from '../actions/rentalActions'

@connect((store) => {
  return {
    rentalsByCityData: store.rentalByCityReducer.data,
    rentalCountByCityData: store.rentalCountByCityReducer.data
  };
})
export default class RentalGrid extends Component {
  componentWillMount() {
    this.props.dispatch(fetchRentalsByCity())
    this.props.dispatch(fetchRentalCountByCity())
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
