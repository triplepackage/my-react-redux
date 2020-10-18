import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Action from '../actions/rentals'

class RentalForm extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.updateRental(this.props.rental)
  }

  handleChange (e) {
    switch (e.target.name) {
      case 'streetNumber':
        this.props.rental.streetNumber = e.target.value
        break
      case 'streetName':
        this.props.rental.streetName = e.target.value
        break
      case 'city':
        this.props.rental.city = e.target.value
        break
      case 'issueDate':
        this.props.rental.issueDate = e.target.value
        break
      case 'expirationDate':
        this.props.rental.expirationDate = e.target.value
        break
    }
  }

  render () {
    const { rental } = this.props

    if (JSON.stringify(rental) == '{}') {
      this.props.history.push({
        pathname: '/'
      })
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText">
          <ControlLabel>Street Number</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.streetNumber}
            name="streetNumber"
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <ControlLabel>Street Name</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.streetName}
            name="streetName"
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <ControlLabel>City</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.city}
            name="city"
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <ControlLabel>State</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.state}
            placeholder="Enter text"
          />
          <ControlLabel>Zip Code</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.zipCode}
            placeholder="Enter text"
          />
          <ControlLabel>Issue Date</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.issueDate}
            name="issueDate"
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <ControlLabel>Expiration Date</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.expirationDate}
            name="expirationDate"
            placeholder="Enter text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button className="btn btn-primary btn-large centerButton" type="submit">Submit</Button>
        <FormControl.Feedback />
        <HelpBlock>Validation is based on string length.</HelpBlock>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRental: (rental) => dispatch(Action.updateRental(rental))
  }
}

const mapStateToProps = (state) => {
  return {
    rental: state.rentals.selectedRental
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalForm)
