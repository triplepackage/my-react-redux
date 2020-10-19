import React, { Component } from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import * as Action from '../actions/rentals'
import 'react-table/react-table.css'

class RentalGrid extends Component {
  componentDidMount () {
    const selectedCity = this.props.selectedCity == null ? process.env.DEFAULT_RENTAL_CITY : this.props.selectedCity
    this.props.fetchRentalsByCity(selectedCity)
  }

  onRowClick = (state, rowInfo) => {
    return {
      onClick: e => {
        this.props.setCurrentRental(rowInfo.original)
        this.props.history.push({
          pathname: '/rental'
        })
      }
    }
  }

  render () {
    const { rentalsByCityData } = this.props

    const columns = [
      {
        id: 'streetNumber',
        Header: () => (<div style={{ textAlign: 'left' }}>Street Number</div>),
        accessor: d => d.streetNumber
      },
      {
        id: 'streetName',
        Header: () => (<div style={{ textAlign: 'left' }}>Street Name</div>),
        accessor: d => d.streetName
      },
      {
        id: 'city',
        Header: () => (<div style={{ textAlign: 'left' }}>City</div>),
        accessor: d => d.city
      },
      {
        id: 'zipCode',
        Header: () => (<div style={{ textAlign: 'left' }}>Zip Code</div>),
        accessor: d => d.zipCode
      },
      {
        id: 'issueDate',
        Header: () => (<div style={{ textAlign: 'left' }}>Issue Date</div>),
        accessor: d => d.issueDate
      },
      {
        id: 'expirationDate',
        Header: () => (<div style={{ textAlign: 'left' }}>Expiration Date</div>),
        accessor: d => d.expirationDate
      },
      {
        id: 'recordStatus',
        Header: () => (<div style={{ textAlign: 'left' }}>Status</div>),
        accessor: d => d.recordStatus
      }
    ]

    return (
      <ReactTable
        data={rentalsByCityData}
        getTrProps={this.onRowClick}
        columns={columns}
        className="-striped -highlight"
        loading={this.props.isRentalsByCityDataFetching}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRentalsByCity: (city) => dispatch(Action.fetchRentalsByCity(city)),
    setCurrentRental: (currentRental) => dispatch(Action.setCurrentRental(currentRental))
  }
}

const mapStateToProps = (state) => {
  return {
    rentalsByCityData: state.rentals.rentalsByCityData,
    isRentalsByCityDataFetching: state.rentals.isRentalsByCityDataFetching,
    selectedCity: state.rentals.selectedCity
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalGrid)
