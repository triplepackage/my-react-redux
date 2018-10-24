import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { connect } from "react-redux"

class RentalForm extends Component {
  render() {
    const { rental } = this.props;

    if (JSON.stringify(rental) == "{}"){
      this.props.history.push({
        pathname: '/'
      })
    }

    return (
      <form>
        <FormGroup
          controlId="formBasicText">
          <ControlLabel>Street Number</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.streetNumber}
            placeholder="Enter text"
          />
          <ControlLabel>Street Name</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.streetName}
            placeholder="Enter text"
          />
          <ControlLabel>City</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.city}
            placeholder="Enter text"
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
            placeholder="Enter text"
          />
          <ControlLabel>Expiration Date</ControlLabel>
          <FormControl
            bsSize="sm"
            type="text"
            defaultValue={rental.expirationDate}
            placeholder="Enter text"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    rental: state.rentals.selectedRental
  };
};

export default connect(mapStateToProps)(RentalForm);
