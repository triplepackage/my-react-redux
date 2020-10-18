import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, Panel } from 'react-bootstrap'

import RentalGrid from './rentalGrid'
import RentalBarChart from './rentalBarChart'
import RentalDoughnut from './rentalDoughnut'
import RentalForm from './rentalForm'
import store from '../store'

store.subscribe(() => {
  console.log('Store changed', store.getState())
})

const NavLinks = () => {
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
             Baltimore County Rental Portal
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem componentClass={Link} href="/datagrid" to="/barchart">
               Home
          </NavItem>
          <NavItem componentClass={Link} href="/barchart" to="/barchart">
               Rentals by City
          </NavItem>
          <NavItem componentClass={Link} href="/doughnut" to="/doughnut">
               Rental Status
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div className="page-header">
              <NavLinks />
            </div>
            <div className="jumbotron col-sm-8 col-sm-offset-2">
              <Panel bsStyle="primary">
                <Panel.Heading>Rental Data</Panel.Heading>
                <Panel.Body>
                  <Switch>
                    <Route exact={true} path="/" component={ RentalBarChart }/>
                    <Route path="/datagrid" exact={ true } component={ RentalGrid }/>
                    <Route path="/barchart" exact={ true } component={ RentalBarChart }/>
                    <Route path="/doughnut" exact={ true } component={ RentalDoughnut }/>
                    <Route path="/rental" exact={ true } component={ RentalForm }/>
                    <Route render={ () => <h1 className="error">404 Error</h1> } />
                  </Switch>
                </Panel.Body>
              </Panel>
              <div className="container">
                <div className="row">
                  <div className="col-sm-4" >
                    <span><img src="http://assets.okfn.org/images/ok_buttons/od_80x15_blue.png" alt="[Open Data]" /></span>
                  </div>
                  <div className="col-sm-8">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
