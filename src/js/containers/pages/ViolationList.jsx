import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ViolationListItem from "../../components/ViolationListItem";
import axios from "axios";
import { Table, Segment, Dimmer, Loader } from "semantic-ui-react";
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty, firebaseConnect } from "react-redux-firebase";
import { Route, Redirect } from 'react-router'


class ViolationsList extends Component {

  handleDelete = (key) => {
    this.props.firebase.database().ref('violations').child(key).remove();
  }

  renderViolations() {
    const { violations } = this.props;
    const violationsMap = _.map(violations, (value, key) => {
      return (
        <ViolationListItem key={key} violationId={key} violation={value} handleDelete={this.handleDelete} />
      );
    });
    if (!_.isEmpty(violationsMap)) {
      return violationsMap;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h4>You have no violations</h4>
      </div>
    );
  }

  render() {
     const { violations } = this.props;
    return (
      <div className="list-content">
      {!isLoaded(violations)?  <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer> : null }
      <Table stackable selectable className="list-content">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Number</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Disposition Date</Table.HeaderCell>
            <Table.HeaderCell>Disposition Comments</Table.HeaderCell>
            <Table.HeaderCell>Device Number</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderViolations()}</Table.Body>
      </Table>
      </div>
    );
  }
}

export default compose(
  firebaseConnect((props) => [
 { path: '/violations', queryParams: [ 'orderByChild=userID', 'equalTo=' + props.user.uid ] }// string equivalent 'todos'
  ]),
  connect((state, props) => ({
    violations: state.firebase.data.violations
  }))
)(ViolationsList)
