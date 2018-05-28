import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import BuildingListItem from "../../components/BuildingListItem";
import axios from "axios";
import { Table, Segment, Dimmer, Loader } from "semantic-ui-react";
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty, firebaseConnect } from "react-redux-firebase";

class BuildingList extends Component {

  handleDelete = (key) => {
    this.props.firebase.database().ref('buildings').child(key).remove();
  }


  renderBuildings() {
    const { buildings } = this.props;
    const buildingMap = _.map(buildings, (value, key) => {
      return (
        <BuildingListItem key={key} buildingId={key} building={value} handleDelete={this.handleDelete}/>
      );
    });
    if (!_.isEmpty(buildingMap)) {
      return buildingMap;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h4>You have no buildings</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  render() {
     const { buildings } = this.props;
    return (
      <div className="list-content">
      {!isLoaded(buildings)? <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer> : null }
      <Table stackable selectable className="list-content">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>House Number</Table.HeaderCell>
            <Table.HeaderCell>Street Name</Table.HeaderCell>
            <Table.HeaderCell>Borough</Table.HeaderCell>
            <Table.HeaderCell>BIN</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderBuildings()}</Table.Body>
      </Table>
      </div>
    );
  }
}

export default compose(
  firebaseConnect((props) => [
 { path: '/buildings', queryParams: [ 'orderByChild=userID', 'equalTo=' + props.user.uid ] }// string equivalent 'todos'
  ]),
  connect((state, props) => ({
    buildings: state.firebase.data.buildings
  }))
)(BuildingList)
