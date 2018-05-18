import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ProjectListItem from "../../components/ProjectListItem";
import axios from "axios";
import { Table, Segment } from "semantic-ui-react";
import { compose } from 'redux'
import { withFirebase, firebaseConnect } from "react-redux-firebase";

class ProjectList extends Component {
  renderProjects() {
    const { projects } = this.props;
    const projectMap = _.map(projects, (value, key) => {
      return (
        <ProjectListItem key={key} projectId={key} project={value} />
      );
    });
    if (!_.isEmpty(projectMap)) {
      return projectMap;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h4>You have no projects</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  render() {
    return (
      <Table stackable selectable className="list-content">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Building</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderProjects()}</Table.Body>
      </Table>
    );
  }
}

export default compose(
  firebaseConnect((props) => [
 { path: '/projects', queryParams: [ 'orderByChild=userID', 'equalTo=' + props.user.uid ] }// string equivalent 'todos'
  ]),
  connect((state, props) => ({
    projects: state.firebase.data.projects
  }))
)(ProjectList)
