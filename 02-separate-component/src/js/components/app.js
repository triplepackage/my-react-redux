import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux";
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { Navbar, Nav, NavItem, Glyphicon, Panel } from 'react-bootstrap';

import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import { reducers } from '../reducers/rentals'

import RentalGrid from './rentalGrid';
import RentalBarChart from './RentalBarChart'

const middleware = applyMiddleware(promise(), thunk)
const store = createStore(reducers, middleware)

store.subscribe(() => {
  console.log("Store changed", store.getState());
})

const NavLinks = () => {
    return(
      <Navbar fixedTop>
         <Navbar.Header>
           <Navbar.Brand>
             Baltimore County Rental Portal
           </Navbar.Brand>
           <Navbar.Toggle />
         </Navbar.Header>
         <Navbar.Collapse>
           <Nav pullRight>
             <NavItem eventKey={1}>
               <NavLink exact to="/datagrid" className="link">Home</NavLink>
             </NavItem>
             <NavItem eventKey={2}>
               <NavLink className="tags" to="/datagrid">Rental Data</NavLink>
             </NavItem>
             <NavItem eventKey={3}>
               <NavLink to="/barchart">Rentals by City</NavLink>
             </NavItem>
           </Nav>
         </Navbar.Collapse>
       </Navbar>
    );
}

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <div>
              <div className="page-header">
                <NavLinks />
              </div>
              <div className="jumbotron col-sm-10 col-sm-offset-1">
                <Panel bsStyle="primary">
                  <Panel.Heading>Rental Data</Panel.Heading>
                  <Panel.Body>
                    <Switch>
                        <Route exact={ true } path="/" component={ RentalGrid }/>
                        <Route path="/datagrid" component={ RentalGrid }/>
                        <Route path="/barchart" component={ RentalBarChart }/>
                        <Route render={ () => <h1>404 Error</h1> } />
                    </Switch>
                  </Panel.Body>
                </Panel>
              </div>
          </div>
        </Router>
      </Provider>

    );
  }
}
